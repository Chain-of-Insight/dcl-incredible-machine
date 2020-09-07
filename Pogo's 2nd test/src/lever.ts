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

export class Lever extends Entity {
  public stateVar = false;
  constructor(model: GLTFShape, transform: TranformConstructorArgs) {
    super();

    this.addComponent(model);
    this.addComponent(new Transform(transform));

    let animator = new Animator();
    // let pull = new AnimationState('no_exist');
    // pull.setParams({looping: false});
    this.addComponentOrReplace(animator);
    // this.getComponent(Animator).addClip(pull);

    engine.addEntity(this);
  }

  public toggle() {
    this.stateVar = !this.stateVar
    // Play button sound
    switchSound.getComponent(AudioSource).playOnce();
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