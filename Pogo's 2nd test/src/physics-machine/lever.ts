// Sounds
const switchSound = new Entity()
switchSound.addComponent(
  new AudioSource(
    new AudioClip('sounds/switch.mp3')
  )
)
switchSound.addComponent(new Transform())
switchSound.getComponent(Transform).position = Camera.instance.position
engine.addEntity(switchSound)

// Highlight
const LightModel = new GLTFShape('models/physics-machine/lever/button2.glb');
const DefaultModel = new GLTFShape('models/physics-machine/lever/button1.glb');

export class Lever extends Entity {
  public stateVar: boolean = false;
  public highlight: Entity;
  public default: Entity;
  constructor(
    //public model: GLTFShape, 
    private transform: TranformConstructorArgs,
    initState: number
    ) {
    super();

    let model = null

    log(initState)
    if (initState==1){
      this.stateVar = true;
      model = LightModel
    } else {
      model = DefaultModel
    }

    this.highlight = new Entity();
    this.highlight.addComponent(LightModel);
    this.highlight.addComponent(new Transform(this.transform));

    this.addComponent(model);
    this.addComponent(new Transform(this.transform));
    engine.addEntity(this)
  }

  public toggle() {
    this.stateVar = !this.stateVar;
    // Play button sound
    switchSound.getComponent(AudioSource).playOnce();
    // Light me up
    if (this.stateVar) {
      //engine.removeEntity(this.default)
      engine.addEntity(this.highlight);
      this.addComponentOrReplace(LightModel);
    } else {
      engine.removeEntity(this.highlight);
      //engine.addEntity(this.default)
      this.addComponentOrReplace(DefaultModel);
    }
  }
  public state(): number{
    if (this.stateVar)
      return 1;

    return 0;
  }
}