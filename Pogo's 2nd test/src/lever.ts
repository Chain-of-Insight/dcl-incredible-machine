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
    clip = new AudioClip('4bf77c44-42db-4134-90f0-06da4202ff04/sounds/LeverSciFi.mp3')
    public stateVar = false

    constructor(model: GLTFShape, transform: TranformConstructorArgs) {
        super();
        engine.addEntity(this);

        this.addComponent(model);
        this.addComponent(new Transform(transform));

        // this part doesn't work
        const animator = new Animator()
        const deactivateClip = new AnimationState('deactivate', { looping: false })
        const activateClip = new AnimationState('activate', { looping: false })
        animator.addClip(deactivateClip)
        animator.addClip(activateClip)
        activateClip.stop()
    }

    public toggle() {
        this.stateVar = !this.stateVar
        // Play button sound
        switchSound.getComponent(AudioSource).playOnce()
    }
    public state(): number{
        if (this.stateVar)
            return 1
        return 0
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