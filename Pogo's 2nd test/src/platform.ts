export class Platform extends Entity {
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
      
    }
  }