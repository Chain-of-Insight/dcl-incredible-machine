import utils from "../node_modules/decentraland-ecs-utils/index"
import { TriggerBoxShape } from "../node_modules/decentraland-ecs-utils/triggers/triggerSystem"
import { MoveTransformComponent } from "../node_modules/decentraland-ecs-utils/transform/component/move"

// Sounds
const switchSound = new Entity()
switchSound.addComponent(
  new AudioSource(
    new AudioClip('sounds/switch.mp3')
  )
)
switchSound.addComponent(new Transform())
switchSound.getComponent(Transform).position = Camera.instance.position
engine.addEntity(switchSound)

const platformLockingSound = new Entity()
platformLockingSound.addComponent(
  new AudioSource(
    new AudioClip('sounds/platform.mp3')
  )
)
platformLockingSound.addComponent(new Transform())
platformLockingSound.getComponent(Transform).position = Camera.instance.position
engine.addEntity(platformLockingSound)

const platformMovingSound = new Entity()
platformMovingSound.addComponent(
  new AudioSource(
    new AudioClip('sounds/platform-moving.mp3')
  )
)
platformMovingSound.addComponent(new Transform())
platformMovingSound.getComponent(Transform).position = Camera.instance.position
engine.addEntity(platformMovingSound);

export class Switchboard extends Entity {
  public stateVar = false
  constructor(
    model: GLTFShape,
    public startPosition: Vector3,
    public endPosition: Vector3,
    public cannon: Entity,
    initState: number
  ) {
    super()
    engine.addEntity(this)

    // Switchboard
    this.addComponent(model)
    if (initState == 0){
      this.addComponent(new Transform({ 
        position: startPosition 
      }));
    } else{
      this.addComponent(new Transform({ 
        position: endPosition 
      }));
      this.stateVar = true
    }
    
    // Cannon
    this.cannon.setParent(this);
  }

  public toggle(){
    if (!this.stateVar){
      this.moveTransform(this.endPosition);
    } else {
      this.moveTransform(this.startPosition);
    }
    this.stateVar = !this.stateVar
  }
  // getter
  public state(): number{
    if (this.stateVar)
        return 1
    return 0
}

  private moveTransform(destination: Vector3) {
    // Play button sound
    switchSound.getComponent(AudioSource).playOnce();

    platformMovingSound.getComponent(AudioSource).playing = true;

    // Move platform
    let currentPosition = this.getComponent(Transform).position;
    let duration = Math.abs(destination.x - currentPosition.x) * 0.25;
    this.addComponentOrReplace(
      new MoveTransformComponent(
        // Begin moving at:
        currentPosition,
        // Move until:
        destination,
        // Duration (seconds):
        duration,
        // On finished callback
        () => {
          platformMovingSound.getComponent(AudioSource).playing = false;
          platformLockingSound.getComponent(AudioSource).playOnce();
          //this.stateVar = !this.stateVar
        }
      )
    )
  }
}