import utils from "../node_modules/decentraland-ecs-utils/index";
import * as ui from '../node_modules/@dcl/ui-utils/index';
import { MoveTransformComponent } from "../node_modules/decentraland-ecs-utils/transform/component/move";
import { Platform } from "./platform";
import { PhysicistNPC } from "./messenger";

const openChestSound = new Entity();
openChestSound.addComponent(
  new AudioSource(
    new AudioClip('sounds/victory.mp3')
  )
);
openChestSound.addComponent(new Transform());
openChestSound.getComponent(Transform).position = Camera.instance.position;
engine.addEntity(openChestSound);

export class PrizePlatform {
  public static solved = false;
  public static elevator: Platform;
  public static treasureChest: Entity;
  public static treasureChestLid: Entity;
  public static messenger: PhysicistNPC;

  static createPlatforms(NPC: PhysicistNPC) {
    const model = new GLTFShape('models/platform/platform_t.glb');
    const chestBaseModel = new GLTFShape('models/treasure/Chest_Base_Gold_01/Chest_Base_Gold_01.glb');
    const chestLidModel = new GLTFShape('models/treasure/Chest_Top_Gold_01/Chest_Top_Gold_01.glb');
    const audio = new AudioClip('sounds/platform-moving.mp3');

    // Main platform
    const staticPlatform = new Platform(
      model,
      audio,
      new Transform({ 
        position: new Vector3(58, 10, 30), 
        rotation: Quaternion.Euler(0, 90, 0),
        scale: new Vector3(4, 0.6581249833106995, 2)
      })
    );

    // Elevator platform
    this.elevator = new Platform(
      model,
      audio,
      new Transform({ 
        position: new Vector3(51, 0, 28.75)
      })
    );

    // Messenger
    this.messenger = NPC;

    // Treasure chest
    let platformPosition = staticPlatform.getComponent(Transform).position;
    this.treasureChest = new Entity();
    this.treasureChestLid = new Entity();
    this.treasureChest.addComponent(chestBaseModel);
    this.treasureChestLid.addComponent(chestLidModel);

    this.treasureChest.addComponent(
      new Transform({
        position: new Vector3(platformPosition.x, platformPosition.y, platformPosition.z - 1.2),
        rotation: new Quaternion(0, -1, 0, 1)
      })
    );
    this.treasureChestLid.addComponent(
      new Transform({
        position: new Vector3(platformPosition.x, platformPosition.y, platformPosition.z - 1.2),
        rotation: new Quaternion(0, -1, 0, 1)
      })
    );
    this.treasureChestLid.addComponent(
      new OnPointerDown(
        (e) => {
          // Open treasure chest
          let openState = new Transform({
            position: new Vector3(platformPosition.x, platformPosition.y + 0.4, platformPosition.z - 1.2),
            rotation: new Quaternion(-0.3299883306026459, -0.6280034780502319, -0.32783016562461853, 0.6238964796066284),
          });
          this.treasureChestLid.addComponentOrReplace(openState);
          // Play sound
          openChestSound.getComponent(AudioSource).playOnce();
          // Remove archery icon / counter
          this.messenger.icon.image.visible = false;
          this.messenger.hitCounter.uiText.fontSize = 0;
          // Notification
          ui.displayAnnouncement('You solved all the puzzles congratulations!');
          // Remove pointer down event
          this.treasureChestLid.removeComponent(OnPointerDown);
        },
        { 
          button: ActionButton.PRIMARY,
          hoverText: 'open sesame'
        }
      )
    );
    
    engine.addEntity(this.treasureChest);
    engine.addEntity(this.treasureChestLid);
  }

  static moveElevator() {
    let state1 = this.elevator.getComponent(Transform).position
    let state2 = new Vector3(state1.x, state1.y, state1.z)
    if (state2.y != 0) {
      state2.y = 0
    } else {
      state2.y = 10
    }
    let duration = (state1.y+state2.y)* 0.25;
    this.elevator.addComponentOrReplace(
      new MoveTransformComponent(
        state1,
        state2,
        duration,
        () => { 
          this.elevator.addComponent(
            new utils.Interval(
              2000,
              () => { 
                this.elevator.removeComponent(utils.Interval)
                this.moveElevator() 
              }
            )
          )
        }
      )
    )
  }
}