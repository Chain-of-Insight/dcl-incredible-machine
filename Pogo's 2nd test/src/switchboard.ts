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

export class Switchboard extends Entity {
  public stateVar = false
  public gears = new Entity()
  constructor(
    model: GLTFShape,
    public startPosition: Vector3, 
    public endPosition: Vector3, 
  ) {
    super()
    engine.addEntity(this)

    // Switchboard
    this.addComponent(model)
    this.addComponent(new Transform({ position: startPosition }))
    
    // Gears
    this.gears.setParent(this)
    this.gears.addComponent(new GLTFShape('models/gears.glb'))
    this.gears.addComponent(new Transform())
  }

  public toggle(){
    if (!this.stateVar){
      this.moveTransform(-180, this.endPosition , this.gears)
    } else {
      this.moveTransform(180, this.startPosition, this.gears)
    }
    this.stateVar = !this.stateVar
  }
  // getter
  public state(): number{
    if (this.stateVar)
        return 1
    return 0
}

  private moveTransform(
    gearsDirection: number,
    destination: Vector3,
    gears: Entity,
    buttonReset: number = 0
  ) {
    // Play button sound
    switchSound.getComponent(AudioSource).playOnce()

    // Begin rotating gears
    gears.addComponentOrReplace(
      new utils.KeepRotatingComponent(
        Quaternion.Euler(0, 0 ,gearsDirection)
      )
    )

    // Move platform
    let currentPosition = this.getComponent(Transform).position
    let duration = Math.abs(destination.x - currentPosition.x) * 0.25
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
          gears.getComponent(utils.KeepRotatingComponent).stop()
          platformLockingSound.getComponent(AudioSource).playOnce()
          //this.stateVar = !this.stateVar
        }
      )
    )
  }
}
