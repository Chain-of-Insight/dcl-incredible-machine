import utils from "../node_modules/decentraland-ecs-utils/index";
import { Switchboard } from "./switchboard"

export class MovableEntity extends Entity {
  constructor(
    model: GLTFShape,
    public sound: AudioClip,
    public sphericalVelocity: Vector3,   // Vector3(r, theta, phi)
    public switchboard: Switchboard,
    public hasFinished: boolean = false,
    private isAnimating: boolean = false,
    private resetVelocity: Vector3,
    private transform: Transform
  ) {
    super();
 
    this.setParent(this.switchboard)
    this.transform = new Transform(this.switchboard.getComponent(Transform))
 
    this.addComponent(model);
    this.addComponent(new AudioSource(sound));
 
    /*
    this.addComponentOrReplace(
      new utils.KeepRotatingComponent(
        //Quaternion.Euler(-Math.cos(sphericalVelocity.y)*180, 0, Math.sin(-sphericalVelocity.y)*180)
        Quaternion.Euler(-Math.sin(90-sphericalVelocity.y)*180, 0, -Math.cos(sphericalVelocity.y)*180)
      )
    )
    */
  }
 
  public create(state) {
    if (this.isAnimating) {
      log('return false');
      return;
    }
 
    engine.addEntity(this);
 
    this.isAnimating = true;
    this.sphericalVelocity = state;
    this.resetVelocity = this.sphericalVelocity;
    this.transform.position = new Vector3(0,0,0);
    this.transform.scale = new Vector3(2, 2, 2);
    this.addComponentOrReplace(this.transform);
 
    let velocity = this.SphericalToCartesian(this.sphericalVelocity);
    let gravity = new Vector3(0, -0.05, 0);
 
    this.handleFlight(velocity, gravity);
  };
 
  // Reset entity
  public destroy() {
    this.hasFinished = false;
    this.isAnimating = false;
    this.sphericalVelocity = this.resetVelocity;
    this.transform.position = new Vector3(0,0,0);
    engine.removeEntity(this);
    //log('destroy');
  }
 
  private SphericalToCartesian(sphrVel: Vector3): Vector3{
    let velocity = new Vector3(0, 0, 0)
    velocity.x = sphrVel.x * Math.sin(sphrVel.z*Math.PI/180) * Math.cos(sphrVel.y*Math.PI/180);
    velocity.y = sphrVel.x * Math.cos(sphrVel.z*Math.PI/180)
    velocity.z = sphrVel.x * Math.sin(sphrVel.z*Math.PI/180) * Math.sin(sphrVel.y*Math.PI/180);
    return velocity;
  }
 
  private getPY(_pY: number): number {
    if (typeof _pY == 'undefined') {
      _pY = 0;
    } else {
      _pY = this.transform.position.y;
    }
    return _pY;
  }
 
  private handleFlight(velocity: Vector3, gravity: Vector3) {
    let pY: number;
    this.addComponent(
      new utils.Interval(10, (): void => {
        this.addComponent(
          new utils.MoveTransformComponent(
            this.transform.position,
            this.transform.position.add(velocity),
            0.01
          )
        )
        velocity = velocity.add(gravity)
 
        pY = this.getPY(pY);
        let psY = this.switchboard.getComponent(Transform).position.y;
 
        if (pY + psY + velocity.y < 0 && velocity.y < 0) {
          velocity = new Vector3(velocity.x*0.6, -velocity.y*0.5, velocity.z*0.6)
          if (Math.abs(velocity.y) < 0.05 && gravity.y != 0){
            velocity.y = 0
            gravity = new Vector3(-velocity.x/2, 0, -velocity.z/2) // hack to change from gravity to friction
          }
        }
        if (velocity.x < 0.001 && velocity.y < 0.001 && velocity.z < 0.001) {
          velocity = null
          gravity = null
          this.getComponent(Transform).position = null
          this.removeComponent(utils.Interval)
          this.removeComponent(utils.MoveTransformComponent)
          this.hasFinished = true
          pY = 0;
          this.destroy();
        }
      })
    );
  }
};