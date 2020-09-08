import utils from "../../node_modules/decentraland-ecs-utils/index"
import { MoveTransformComponent } from "../../node_modules/decentraland-ecs-utils/transform/component/move";

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
    public target: Entity,
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

    /*
    // fix target starting angle and draw it
    this.target.addComponentOrReplace(
      new Transform({
          position: this.target.getComponent(Transform).position,
          rotation: Quaternion.Euler(0, 180+this.angle(this.getComponent(Transform).position,this.target.getComponent(Transform).position), 0)
        })
      );
    engine.addEntity(this.target)
    */
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
    let duration = this.distanceTraveled(currentPosition, destination) * 0.25;
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
        }
      )
    )

    /*
    this.target.addComponentOrReplace(
      new utils.RotateTransformComponent(
        this.target.getComponent(Transform).rotation,
        Quaternion.Euler(0, 180+this.angle(destination,this.target.getComponent(Transform).position), 0),
        duration
      )
    )
    */
  }

  private distanceTraveled(point1: Vector3, point2: Vector3): number {
    let dist = Math.sqrt((point1.x-point2.x)**2+(point1.y-point2.y)**2+(point1.z-point2.z)**2)
    return dist
  }

  private angle(point1: Vector3, point2: Vector3): number{
    let result = 0
    result = Math.atan2(point1.x-point2.x, point1.z-point2.z)*180/Math.PI
    return result
  }
}
