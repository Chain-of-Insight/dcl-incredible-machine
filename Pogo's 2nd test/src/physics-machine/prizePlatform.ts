import utils from "../../node_modules/decentraland-ecs-utils/index";
import * as ui from '../../node_modules/@dcl/ui-utils/index';
import { MoveTransformComponent } from "../../node_modules/decentraland-ecs-utils/transform/component/move";
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
  public static platformPosition;
  public static isMoving: boolean;

  static createPlatforms(NPC: PhysicistNPC) {
    const model = new GLTFShape('models/physics-machine/platform/platform_t.glb');
    const chestBaseModel = new GLTFShape('models/physics-machine/treasure/Chest_Base_Gold_01/Chest_Base_Gold_01.glb');
    const chestLidModel = new GLTFShape('models/physics-machine/treasure/Chest_Top_Gold_01/Chest_Top_Gold_01.glb');
    const audio = new AudioClip('sounds/physics-machine/platform-moving.mp3');

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
    this.platformPosition = staticPlatform.getComponent(Transform).position;
    this.treasureChest = new Entity();
    this.treasureChestLid = new Entity();
    this.treasureChest.addComponent(chestBaseModel);
    this.treasureChestLid.addComponent(chestLidModel);

    this.treasureChest.addComponent(
      new Transform({
        position: new Vector3(this.platformPosition.x, this.platformPosition.y, this.platformPosition.z - 1.2),
        rotation: new Quaternion(0, -1, 0, 1)
      })
    );
    this.treasureChestLid.addComponent(
      new Transform({
        position: new Vector3(this.platformPosition.x, this.platformPosition.y, this.platformPosition.z - 1.2),
        rotation: new Quaternion(0, -1, 0, 1)
      })
    );
    this.treasureChestLid.addComponent(
      new OnPointerDown(
        (e) => {
          // Open treasure chest
          let openState = new Transform({
            position: new Vector3(this.platformPosition.x, this.platformPosition.y + 0.4, this.platformPosition.z - 1.2),
            rotation: new Quaternion(-0.3299883306026459, -0.6280034780502319, -0.32783016562461853, 0.6238964796066284),
          });
          this.treasureChestLid.addComponentOrReplace(openState);
          // Play sound
          openChestSound.getComponent(AudioSource).playOnce();
          // Remove archery icon / counter
          this.messenger.icon.image.visible = false;
          this.messenger.hitCounter.uiText.visible = false;
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

  static endGame() {
    let messageDisplayed = false;
    let arrow = new Entity();
    engine.addEntity(arrow)
    arrow.addComponent(new GLTFShape('models/physics-machine/arrow/arrow.glb'));
    arrow.addComponent(
    new Transform({
        position: this.elevator.getComponent(Transform).position.add(new Vector3(0, 1, 0)),
        rotation: Quaternion.Euler(0, 90, 0),
        scale: new Vector3(3, 3, 3)
      })
    );

    let duration = this.platformPosition.y * 0.25;

    const trigger = new Entity();
    trigger.setParent(this.elevator)
    engine.addEntity(trigger);
    trigger.addComponent(
      new Transform({ position: new Vector3(0, 0, 0) })
    );
    trigger.addComponent(
        new utils.TriggerComponent(
          new utils.TriggerBoxShape(new Vector3(3, 5, 3), new Vector3(0, 0, 0)),
          0,
          0,
          null,
          null,
          (): void => {
            try{
                engine.removeEntity(arrow)
            }
            catch {}
            if (!messageDisplayed){
                this.messenger.dispFinalMessage();
                messageDisplayed = true;
            }
            let state1 = this.elevator.getComponent(Transform).position
            let state2 = new Vector3(state1.x, this.platformPosition.y, state1.z)
            this.moveElevator(state1, state2, duration)
          },
          (): void => {
            let state1 = this.elevator.getComponent(Transform).position
            let state2 = new Vector3(state1.x, 0, state1.z)
            this.moveElevator(state1, state2, duration)
          }
        )
    )

  }

  private static moveElevator(state1, state2, duration){
    this.elevator.addComponentOrReplace(
        new MoveTransformComponent(
          state1,
          state2,
          duration,
        )
    )
  }
}