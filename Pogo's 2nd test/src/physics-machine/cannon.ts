import utils from "../../node_modules/decentraland-ecs-utils/index";

export class Cannon extends Entity {
  constructor(model: GLTFShape,
    transform: TranformConstructorArgs) {
    super();
    engine.addEntity(this);

    this.addComponent(model);
    this.addComponent(new Transform(transform));
    this.addComponent(new AudioSource(new AudioClip("sounds/button.mp3")));
  }
  public toggle(angle: Vector3){
    this.addComponentOrReplace(
      new utils.RotateTransformComponent(
        this.getComponent(Transform).rotation,
        Quaternion.Euler(0, 90-angle.y, 0),
        0.5
      )
    )

  }
}
