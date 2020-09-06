import utils from "../node_modules/decentraland-ecs-utils/index";
import { Switchboard } from "./switchboard"

export class MovableEntity extends Entity {
  constructor(
    model: GLTFShape,
    //transform: TranformConstructorArgs,
    sound: AudioClip,
    sphericalVelocity: Vector3,   // Vector3(r, theta, phi)
    //public velocity: Vector3,
    switchboard: Switchboard,
    public hasFinished: boolean = false
  ) {
    super();
    engine.addEntity(this);
    this.setParent(switchboard)
    const transform = new Transform(switchboard.getComponent(Transform))

    this.addComponent(model);
    this.addComponent(transform);
    this.addComponent(new AudioSource(sound));
    transform.position = new Vector3(0,0,0);

    let gravity = new Vector3(0, -0.05, 0);
    let velocity = this.SphericalToCartesian(sphericalVelocity)

    /*
    this.addComponentOrReplace(
      new utils.KeepRotatingComponent(
        //Quaternion.Euler(-Math.cos(sphericalVelocity.y)*180, 0, Math.sin(-sphericalVelocity.y)*180)
        Quaternion.Euler(-Math.sin(90-sphericalVelocity.y)*180, 0, -Math.cos(sphericalVelocity.y)*180)
      )
    )
    */

    this.addComponent(
      new utils.Interval(10, (): void => {
        let newPos = this.getComponent(Transform).position.add(velocity)
        velocity = velocity.add(gravity)
        this.addComponentOrReplace(
          new utils.MoveTransformComponent(
            this.getComponent(Transform).position,
            newPos,
            0.01
          )
        )
        if (this.getComponent(Transform).position.y + switchboard.getComponent(Transform).position.y + velocity.y < 0 && velocity.y < 0)
        {
          velocity = new Vector3(velocity.x*0.6, -velocity.y*0.5, velocity.z*0.6)
          if (Math.abs(velocity.y) < 0.05 && gravity.y != 0){
            velocity.y = 0
            gravity = new Vector3(-velocity.x/2, 0, -velocity.z/2) // hack to change from gravity to friction
          }
        }
        if (velocity.x < 0.001 && velocity.y < 0.001 && velocity.z < 0.001) 
        {
          this.hasFinished = true
          this.removeComponent(utils.Interval);
          engine.removeEntity(this);
        }
      })
    );
  }

  private SphericalToCartesian(sphrVel: Vector3): Vector3{
    let velocity = new Vector3(0, 0, 0)
    velocity.x = sphrVel.x * Math.sin(sphrVel.z*Math.PI/180) * Math.cos(sphrVel.y*Math.PI/180);
    velocity.y = sphrVel.x * Math.cos(sphrVel.z*Math.PI/180)
    velocity.z = sphrVel.x * Math.sin(sphrVel.z*Math.PI/180) * Math.sin(sphrVel.y*Math.PI/180);
    return velocity;
  }
}