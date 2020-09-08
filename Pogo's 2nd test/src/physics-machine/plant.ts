export class Plant extends Entity {
    constructor(
      model: GLTFShape,
      audio: AudioClip,
      transform: TranformConstructorArgs
    ) {
      super();
      engine.addEntity(this);
  
      this.addComponent(model);
      this.addComponent(new Transform(transform));
      this.addComponent(new AudioSource(audio));

      this.addComponent(
        new OnPointerDown(
          (e) => {
            this.getComponent(AudioSource).playOnce()
          },
          {
            button: ActionButton.POINTER,
            hoverText: 'pet the plant'
          }
        )
      );
    }
  }