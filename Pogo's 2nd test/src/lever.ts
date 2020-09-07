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
const LightModel = new GLTFShape('models/lever/button2.glb'); 

export class Lever extends Entity {
  public stateVar: boolean = false;
  public highlight: Entity;
  constructor(model: GLTFShape, 
    private transform: TranformConstructorArgs,
    initState: number
    ) {
    super();

    if (initState==1){
        this.stateVar = true;
    }

    this.addComponent(model);
    this.addComponent(new Transform(transform));

    this.highlight = new Entity();
    this.highlight.addComponent(LightModel);
    this.highlight.addComponent(new Transform(transform));

    engine.addEntity(this);
  }

  public toggle() {
    this.stateVar = !this.stateVar;
    // Play button sound
    switchSound.getComponent(AudioSource).playOnce();
    // Light me up
    if (this.stateVar) {
      engine.addEntity(this.highlight);
    } else {
      engine.removeEntity(this.highlight);
    }
  }
  public state(): number{
    if (this.stateVar)
      return 1;

    return 0;
  }

  /*
  toggle(value: boolean, playSound = false) {
    if (playSound) {
      const source = new AudioSource(this.clip)
      this.addComponentOrReplace(source)
      source.playing = true
    }

    const animator = this.getComponent(Animator)
    const activateClip = animator.getClip('activate')
    const deactivateClip = animator.getClip('deactivate')
    activateClip.stop()
    deactivateClip.stop()
    const clip = value ? activateClip : deactivateClip
    clip.play()

    this.state = !this.state
  }
  */
}