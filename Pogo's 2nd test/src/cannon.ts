
export class Cannon extends Entity {
  constructor(model: GLTFShape,
    transform: TranformConstructorArgs) {
    super();
    engine.addEntity(this);

    this.addComponent(model);
    this.addComponent(new Transform(transform));
    this.addComponent(new AudioSource(new AudioClip("sounds/button.mp3")));


  }
}
