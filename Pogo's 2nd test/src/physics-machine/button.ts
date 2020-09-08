/**
 * A big red button.
 */
export class Button extends Entity {
  // The shape and position may differ
  constructor(model: GLTFShape, transform: TranformConstructorArgs) {
    super();
    engine.addEntity(this);

    this.addComponent(model);
    this.addComponent(new Transform(transform));

    //this.addComponent(new AudioSource(new AudioClip("sounds/button.mp3")));

    //this.addComponent(new Animator());
    //this.getComponent(Animator).addClip(
    //  new AnimationState("Button_Action", { looping: false })
    //);
  }
}
