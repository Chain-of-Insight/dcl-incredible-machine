import utils from "../node_modules/decentraland-ecs-utils/index";
import { Switchboard } from "./switchboard"
import { Cannon } from "./cannon"
import { Lever } from "./lever"
import { Ball } from "./ball"

// Button sounds
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

let solSwitchboard: Array<number> = [ 1, 1, 0, 1, 0, 0 ];
let solLever: Array<number> = [ 1, 1, 0, 1, 0, 0 ];

export class PuzzlePiece {
  public ball;
  public switchboard;
  public cannon;
  public lever1;
  public lever2;


  constructor(
    public switchPosition1: Vector3,
    public switchPosition2: Vector3,
    public leverPosition: Vector3,
    public angles: Array<Vector3>
  ) {
    // Cannon 1
    this.cannon = new Cannon(
        new GLTFShape('models/cannon/Cannon_01.glb'),
        new Transform({
            rotation: new Quaternion(0, 0.5, 0, 1)
        })
    )
    let randSwitch = this.getRandomBinary()
    // First switchboard
    this.switchboard = new Switchboard(
        new GLTFShape('models/platform/platform.glb'),
        switchPosition1,
        switchPosition2,
        this.cannon,
        randSwitch
    );
    // First lever, switchboard control
    this.lever1 = new Lever(
        new GLTFShape('models/lever/Lever_Console.glb'),
        { position: leverPosition },
        randSwitch
    );
    this.lever1.addComponent(
        new OnClick((): void => {
          this.switchboard.toggle();
          this.lever1.toggle();
        })
    );
    this.lever2 = new Lever(new GLTFShape('models/lever/Lever_Console.glb'),
        { position: leverPosition.add(new Vector3(-1,0,0)) },
        this.getRandomBinary()
    );
    this.lever2.addComponent(
        new OnClick((): void => {
            this.lever2.toggle();
        })
    );
    this.ball = new Ball(
        new GLTFShape("models/bowlingball2.glb"),
        new AudioClip("sounds/coinPickup.mp3"),
        angles[this.lever2.state()],  // r, theta, phi, phi controls height
        this.switchboard,
        false,
        false,
        null,
        null,
      );
 
  }

  public makeBall(index: number): boolean{
    buttonFiredSound.getComponent(AudioSource).playOnce();
    this.ball.create(this.angles[this.lever2.state()])
    if (this.switchboard.state() == solSwitchboard[index] && this.lever2.state() == solLever[index]){
        return true
    }
    buttonMisfiredSound.getComponent(AudioSource).playOnce();
    return false
  }

  // returns 0 or 1
  getRandomBinary(): number{
    return Math.floor(Math.random() * Math.floor(2))
  }
};