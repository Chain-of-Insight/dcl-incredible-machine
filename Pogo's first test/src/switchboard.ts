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
  constructor(
    model: GLTFShape,
    startPosition: Vector3, 
    endPosition: Vector3, 
    btn1Position: Vector3, 
    btn2Position: Vector3
  ) {
    super()
    engine.addEntity(this)
    
    // Gears
    const gears = new Entity()
    gears.setParent(this)
    gears.addComponent(new GLTFShape('models/gears.glb'))
    gears.addComponent(new Transform())

    // Buttons
    const btn1 = new Entity()
    engine.addEntity(btn1)
    btn1.addComponent(new GLTFShape('models/buttonA.glb'))
    btn1.addComponent(new Transform({
      position: btn1Position
    }))

    const btn2 = new Entity()
    engine.addEntity(btn2)
    btn2.addComponent(new GLTFShape('models/buttonB.glb'))
    btn2.addComponent(new Transform({
      position: btn2Position
    }))

    // Switchboard
    this.addComponent(model)
    this.addComponent(new Transform({ position: startPosition }))
    
    // Child elements
    //btn1.setParent(this)
    btn1.addComponent(
      new utils.TriggerComponent(
        new TriggerBoxShape(
          new Vector3(2,2,2), 
          new Vector3(1.5,2,0)
        ),
        null, null, null, null, 
        // On camera enter:
        () => {
          let btn1Position = -0.12
          let btn2Position = 0
          this.moveTransform(btn1Position, btn2Position, -180, endPosition, gears, btn1, btn2)
        }
      )
    )

    //btn2.setParent(this)
    btn2.addComponent(
      new utils.TriggerComponent(
        new TriggerBoxShape(
          new Vector3(2,2,2), 
          new Vector3(-1.5,2,0)
        ),
        null, null, null, null, 
        // On camera enter:
        () => {
          let btn1Position = 0
          let btn2Position = -0.12
          this.moveTransform(btn1Position, btn2Position, 180, startPosition, gears, btn1, btn2)
        }
      )
    )
  }

  private moveTransform(
    btn1Position: number, 
    btn2Position: number, 
    gearsDirection: number,
    destination: Vector3,
    gears: Entity,
    btn1: Entity,
    btn2: Entity,
    buttonReset: number = 0
  ) {
    // Play button sound
    switchSound.getComponent(AudioSource).playOnce()

    // Toggle highlighted button
    btn1.getComponent(Transform).position.y = btn1Position
    btn2.getComponent(Transform).position.y = btn2Position

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
          btn1.getComponent(Transform).position.y = buttonReset
          btn2.getComponent(Transform).position.y = buttonReset
          platformLockingSound.getComponent(AudioSource).playOnce()
        }
      )
    )
  }
}
