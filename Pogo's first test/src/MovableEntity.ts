import utils from "node_modules/decentraland-ecs-utils/index";
import { Switchboard } from "./switchboard"

export class MovableEntity extends Entity {
  hasFinished: boolean = false;
  constructor(
    model: GLTFShape,
    //transform: TranformConstructorArgs,
    sound: AudioClip,
    public velocity: Vector3,
    switchboard: Switchboard
  ) {
    super();
    engine.addEntity(this);
    this.setParent(switchboard)
    const transform = new Transform(switchboard.getComponent(Transform))

    this.addComponent(model);
    this.addComponent(transform);
    this.addComponent(new AudioSource(sound));
    transform.position = new Vector3(0,0,0);

    const gravity = new Vector3(0, -0.05, 0);

    this.addComponent(
      new utils.Interval(50, (): void => {
        let newPos = this.getComponent(Transform).position.add(velocity)
        velocity = velocity.add(gravity)
          this.addComponentOrReplace(
            new utils.MoveTransformComponent(
              this.getComponent(Transform).position,
              newPos,
              0.1
            )
          )
          if (this.getComponent(Transform).position.y + switchboard.getComponent(Transform).position.y < 0)
          {
            this.removeComponent(utils.Interval);
            engine.removeEntity(this);
          }
      })
    );
  }
}