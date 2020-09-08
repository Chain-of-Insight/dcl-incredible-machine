import { Switchboard } from "./switchboard"
import { Cannon } from "./cannon"
import { Lever } from "./lever"
import { Ball } from "./ball"
import { PhysicistNPC } from "./messenger"
import { Solution } from "./solution"
import utils from "../../node_modules/decentraland-ecs-utils/index"


export class PuzzlePiece {
  public ball;
  public switchboard;
  public cannon;
  public lever1;
  public lever2;
  public target;

  constructor(
    public switchPosition1: Vector3,
    public switchPosition2: Vector3,
    public leverPosition: Vector3,
    public targetPosition: Vector3,
    public angles: Array<Vector3>,
    public leverRotation: Quaternion,
    public messenger: PhysicistNPC,
    index: number
  ) {
    let randSwitch = this.getRandomBinary()
    let randLever = this.getRandomBinary()
    while (randSwitch == Solution.solSwitchboard[index] && randLever == Solution.solLever[index]){  // never have the exact solution from the beginning, right?
        randSwitch = this.getRandomBinary()
        randLever = this.getRandomBinary()
    }
    // Cannon 1
    this.cannon = new Cannon(
        new GLTFShape('models/physics-machine/cannon/Cannon_01.glb'),
        new Transform({
            rotation: Quaternion.Euler(0, 90-angles[randLever].y, 0)
        })
    )
    // Target 1
    this.target = new Entity();
    this.target.addComponent(new GLTFShape('models/physics-machine/target/target.glb'));
    this.target.addComponent(
    new Transform({
        position: targetPosition,
        rotation: Quaternion.Euler(0, angles[randLever].y, 0)
      })
    );
    this.target.addComponent(new utils.KeepRotatingComponent(
            Quaternion.Euler(0, 15, 0)
        )
    )
    engine.addEntity(this.target);

    // First switchboard
    this.switchboard = new Switchboard(
        new GLTFShape('models/physics-machine/platform/platform.glb'),
        switchPosition1,
        switchPosition2,
        this.cannon,
        this.target,
        randSwitch
    );
    // First lever, switchboard control
    this.lever1 = new Lever(
        { position: leverPosition,
          scale: new Vector3(2, 2, 2),
          rotation: leverRotation },
        randSwitch
    );
    this.lever1.addComponent(
        new OnPointerDown(
            (e) => {
          this.switchboard.toggle();
          this.lever1.toggle();
        })
    );
    this.lever2 = new Lever(
        { position: leverPosition.add(new Vector3(-3,0,0)),
            scale: new Vector3(2, 2, 2),
            rotation: leverRotation },
        randLever
    );
    this.lever2.addComponent(
        new OnPointerDown(
            (e) => {
            this.lever2.toggle();
            this.cannon.toggle(angles[this.lever2.state()])
        })
    );
    this.ball = new Ball(
        new GLTFShape("models/physics-machine/bowlingball2.glb"),
        new AudioClip("sounds/physics-machine/coinPickup.mp3"),
        angles[this.lever2.state()],  // r, theta, phi, phi controls height
        this.switchboard,
        false,
        false,
        null,
        null,
        targetPosition,
        this.messenger
      );
 
  }

  public makeBall(index: number): boolean{
    this.ball.create(this.angles[this.lever2.state()])
    if (this.switchboard.state() == Solution.solSwitchboard[index] && this.lever2.state() == Solution.solLever[index]){
      // log('good!')
      this.ball.create(this.angles[this.lever2.state()])
      return true
    }
    this.ball.create(this.angles[this.lever2.state()])
    return false
  }
  public checkSol(index:number): boolean{
    if (this.switchboard.state() == Solution.solSwitchboard[index] && this.lever2.state() == Solution.solLever[index]){
        return true
    }
    return false
  }

  // returns 0 or 1
  getRandomBinary(): number {
    // return Math.floor(Math.random() * Math.floor(2))
    let randomBoolean = Math.random() >= 0.5;
    if (randomBoolean)
      return 1;
    else
      return 0;
  }
};