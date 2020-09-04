import utils from "node_modules/decentraland-ecs-utils/index";
import { ActionsSequenceSystem } from "node_modules/decentraland-ecs-utils/actionsSequenceSystem/actionsSequenceSystem";

export class MovableEntity extends Entity implements ActionsSequenceSystem.IAction {
  hasFinished: boolean = false;
  constructor(
    model: GLTFShape,
    transform: TranformConstructorArgs,
    sound: AudioClip,
    deltaPosition: Vector3,
    public velocity: Vector3,
  ) {
    super();
    engine.addEntity(this);

    this.addComponent(model);
    this.addComponent(new Transform(transform));
    this.addComponent(new AudioSource(sound));

    const startPos = transform.position;
    const endPos = transform.position.add(deltaPosition);

    this.addComponent(
      new utils.ToggleComponent(utils.ToggleState.Off, (value): void => {
        if (value == utils.ToggleState.On) {
          this.addComponentOrReplace(
            new utils.MoveTransformComponent(
              this.getComponent(Transform).position,
              endPos,
              0.5
            )
          );
        } else {
          this.addComponentOrReplace(
            new utils.MoveTransformComponent(
              this.getComponent(Transform).position,
              startPos,
              0.5
            )
          );
        }

        this.getComponent(AudioSource).playOnce();
      })
    );
  }
  update() {
      const position = this.getComponent(Transform).position
      const vel = this.velocity
      position.x += vel.x
      position.y += vel.y
      position.z += vel.z
  }
  onStart(): void {
  }
  //Method to run at the end
  onFinish(): void {
  }
}