import utils from "../../node_modules/decentraland-ecs-utils/index";
import { Switchboard } from "./switchboard"
import { PhysicistNPC } from "./messenger"

// sounds
const buttonFiredSound = new Entity();
buttonFiredSound.addComponent(
  new AudioSource(
    new AudioClip('sounds/cannon.mp3')
  )
);
buttonFiredSound.addComponent(new Transform());
buttonFiredSound.getComponent(Transform).position = Camera.instance.position;
engine.addEntity(buttonFiredSound);

const buttonMisfiredSound = new Entity();
buttonMisfiredSound.addComponent(
  new AudioSource(
    new AudioClip('sounds/failed.mp3')
  )
);
buttonMisfiredSound.addComponent(new Transform());
buttonMisfiredSound.getComponent(Transform).position = Camera.instance.position;
engine.addEntity(buttonMisfiredSound);

const targetHitSound = new Entity();
targetHitSound.addComponent(
  new AudioSource(
    new AudioClip('sounds/targethit.mp3')
  )
);
targetHitSound.addComponent(new Transform());
targetHitSound.getComponent(Transform).position = Camera.instance.position;
engine.addEntity(targetHitSound);

const victorySound = new Entity();
victorySound.addComponent(
  new AudioSource(
    new AudioClip('sounds/victory.mp3')
  )
);
victorySound.addComponent(new Transform());
victorySound.getComponent(Transform).position = Camera.instance.position;
engine.addEntity(victorySound);


export class Ball extends Entity {
  constructor(
    model: GLTFShape,
    public sound: AudioClip,
    public sphericalVelocity: Vector3,   // Vector3(r, theta, phi)
    public switchboard: Switchboard,
    public hasFinished: boolean = false,
    private isAnimating: boolean = false,
    private resetVelocity: Vector3,
    private transform: Transform,
    public targetPosition: Vector3,
    public messenger: PhysicistNPC
  ) {
    super();

    this.setParent(this.switchboard)
    this.transform = new Transform(this.switchboard.getComponent(Transform))
 
    this.addComponent(model);
    this.addComponent(new AudioSource(sound));

    engine.addEntity(this);
    engine.removeEntity(this);
  }
 
  public create(state) {
    if (this.isAnimating) {
      log('return false');
      return;
    }
 
    this.isAnimating = true;
    this.sphericalVelocity = state;
    this.resetVelocity = this.sphericalVelocity;
    this.transform.position = new Vector3(0, 0, 0);
    this.transform.scale = new Vector3(2, 2, 2);
    this.addComponentOrReplace(this.transform);
 
    let velocity = this.SphericalToCartesian(this.sphericalVelocity);
    let gravity = new Vector3(0, -0.05, 0);

    engine.addEntity(this)
 
    this.handleFlight(velocity, gravity);
  };
 
  // Reset entity
  public destroy() {
    this.hasFinished = false;
    this.isAnimating = false;
    this.sphericalVelocity = this.resetVelocity;
    this.transform.position = new Vector3(0,0,0);
    engine.removeEntity(this);
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
    let targetHit = false;
    let soundPlayed = false;
    let shown = false;
    let tarPosInScene = this.targetPosition.subtract(this.switchboard.getComponent(Transform).position)
    this.addComponent(
      new utils.Interval(10, (): void => { 
        this.addComponent(
          new utils.MoveTransformComponent(
            this.transform.position,
            this.transform.position.add(velocity),
            0.01
          )
        )
        if (!soundPlayed){
          buttonFiredSound.getComponent(AudioSource).playOnce();
          soundPlayed = true
        }

        velocity = velocity.add(gravity)
 
        pY = this.getPY(pY);
        let psY = this.switchboard.getComponent(Transform).position.y;
 
        //log(this.transform.position.add(this.switchboard.getComponent(Transform).position))   // use this to find target positions quickly
        if (!targetHit && this.distanceCheck(this.transform.position, tarPosInScene)){  // hit target check
          this.messenger.onHit()
          targetHit = true
          if (this.messenger.numHits < this.messenger.maxHits){
            targetHitSound.getComponent(AudioSource).playOnce();
          } else {
            victorySound.getComponent(AudioSource).playOnce();
          }
        }
        if (pY + psY + velocity.y < 0 && velocity.y < 0) {
          velocity = new Vector3(velocity.x*0.6, -velocity.y*0.5, velocity.z*0.6)
          if (Math.abs(velocity.y) < 0.05 && gravity.y != 0){
            velocity.y = 0
            gravity = new Vector3(-velocity.x/2, 0, -velocity.z/2) // hack to change from gravity to friction
          }
        }
        if (Math.abs(velocity.x) < 0.001 && Math.abs(velocity.y) < 0.001 && Math.abs(velocity.z) < 0.001) {
          velocity = null
          gravity = null
          this.getComponent(Transform).position = null
          this.removeComponent(utils.Interval)
          this.removeComponent(utils.MoveTransformComponent)
          this.hasFinished = true
          pY = 0;
          if (!targetHit || this.messenger.numHits == this.messenger.maxHits){
            this.messenger.dispMessage()
          }
          if (!targetHit){
            buttonMisfiredSound.getComponent(AudioSource).playOnce();
          } else {
            if (this.messenger.numHits < this.messenger.maxHits){
              buttonFiredSound.getComponent(AudioSource).playOnce();
            }
          }
          this.destroy();
        }
      })
    );
  }

  private distanceCheck(point1: Vector3, point2: Vector3): boolean{
    let dist = Math.sqrt((point1.x-point2.x)**2+(point1.y-point2.y)**2+(point1.z-point2.z)**2)
    return dist < 2
  }
};