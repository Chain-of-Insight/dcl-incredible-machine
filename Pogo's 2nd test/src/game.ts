import { MovableEntity } from './movableEntity';
import { Switchboard } from "./switchboard";
import { Button } from "./button";
import { Lever } from "./lever";

let solSwitchboard: Array<number> = [ 1, 1, 0, 1, 0, 0 ];
let solLever: Array<number> = [ 1, 1, 0, 1, 0, 0 ];


// FIRST ITEMSET //////////////////////////////////////////

// Cannon 1
const cannon1 = new Entity();
cannon1.addComponent(new GLTFShape('models/cannon/Cannon_01.glb'));
cannon1.addComponent(
  new Transform({
    rotation: new Quaternion(0, 0.5, 0, 1)
  })
);
// Target 1
const target1 = new Entity();
target1.addComponent(new GLTFShape('models/target/target.glb'));
target1.addComponent(
  new Transform({
    position: new Vector3(35, 14, 14),
    rotation: new Quaternion(0, 0.5, 0, 1)
  })
);
engine.addEntity(target1);

// First switchboard
const switchboard1 = new Switchboard(
  new GLTFShape('models/platform/platform.glb'),
  new Vector3(8, -0.13, 8),
  new Vector3(27, 5, 8),
  cannon1
);
// First lever, switchboard control
const lever11 = new Lever(
  new GLTFShape('models/lever/button1.glb'),
  { 
    position: new Vector3(33,0,20)
  }
);

// First lever, angle control
let ang1: Array<Vector3> = [ new Vector3(1, 30, 45), new Vector3(1, 90, 30) ]
const lever12 = new Lever(new GLTFShape('models/lever/button1.glb'),
  { 
    position: new Vector3(32,0,20)
  }
);
lever12.addComponent(
  new OnClick((): void => {
    lever12.toggle();
  })
);
////////////////////////////////////////////////////





// SECOND ITEMSET //////////////////////////////////////////

// Cannon 2
const cannon2 = new Entity();
cannon2.addComponent(new GLTFShape('models/cannon/Cannon_01.glb'))
cannon2.addComponent(
  new Transform({
    rotation: new Quaternion(0, 0.5, 0, 1)
  })
);
// Target 2
const target2 = new Entity();
target2.addComponent(new GLTFShape('models/target/target.glb'));
target2.addComponent(
  new Transform({
    position: new Vector3(33, 11, 43),
    rotation: new Quaternion(0, 0.5, 0, 1)
  })
);
engine.addEntity(target2);

// 2nd switchboard
const switchboard2 = new Switchboard(
  new GLTFShape('models/platform/platform.glb'),
  new Vector3(27, 6, 33), 
  new Vector3(15, 9, 33),
  cannon2
);

// 2nd lever, switchboard control
const lever21 = new Lever(
  new GLTFShape('models/lever/button1.glb'),
  { 
    position: new Vector3(33,0,25),
    rotation: new Quaternion(0, -90, 0, 1)
  }
);
lever21.addComponent(
  new OnClick((): void => {
    switchboard2.toggle();
    lever21.toggle();
  })
);

// 2nd lever, angle control
let ang2: Array<Vector3> = [ new Vector3(0.5, 30, 40), new Vector3(1, 30, 35) ]
const lever22 = new Lever(
  new GLTFShape('models/lever/button1.glb'),
  { 
    position: new Vector3(32,0,25),
    rotation: new Quaternion(0, -90, 0, 1)
  }
);
lever22.addComponent(
  new OnClick((): void => {
    lever22.toggle();
  })
);
////////////////////////////////////////////////////






let levers: Array<Lever> = [ lever11, lever12, lever21, lever22 ]

const ball1 = new MovableEntity(
  new GLTFShape("models/bowlingball2.glb"),
  new AudioClip("sounds/coinPickup.mp3"),
  ang1[lever12.state()],  // r, theta, phi, phi controls height
  switchboard1,
  false,
  false,
  null,
  null,
);

const ball2 = new MovableEntity(
  new GLTFShape("models/bowlingball2.glb"),
  new AudioClip("sounds/coinPickup.mp3"),
  ang2[lever22.state()],  // r, theta, phi, phi controls height
  switchboard2,
  false,
  false,
  null,
  null,
);

// Button
const button1 = new Button(
  new GLTFShape("models/buttons/firebutton.glb"), 
  { 
    position: new Vector3(30, 1.5, 19),
    scale: new Vector3(0.3, 0.3, 0.3) 
  }
);

const button2 = new Button(
  new GLTFShape("models/buttons/firebutton.glb"), 
  { 
    position: new Vector3(30, 1.5, 26),
    scale: new Vector3(0.3, 0.3, 0.3),
    rotation: new Quaternion(0, -20, 0, 1)
  }
);

// Buttons (firing controls)
const buttonFiredSound = new Entity();
buttonFiredSound.addComponent(
  new AudioSource(
    new AudioClip('sounds/cannon.mp3')
  )
);
buttonFiredSound.addComponent(new Transform());
buttonFiredSound.getComponent(Transform).position = Camera.instance.position;
engine.addEntity(buttonFiredSound);

const buttonMisfiredSound = new Entity();
buttonMisfiredSound.addComponent(
  new AudioSource(
    new AudioClip('sounds/failed.mp3')
  )
);
buttonMisfiredSound.addComponent(new Transform());
buttonMisfiredSound.getComponent(Transform).position = Camera.instance.position;
engine.addEntity(buttonMisfiredSound);

button1.addComponent(
  new OnPointerDown(
    (e) => {
      makeBall(0, ang2[lever12.state()]);
    },
    { 
      button: ActionButton.POINTER,
      hoverText: 'fire'
    }
  )
);

button2.addComponent(
  new OnPointerDown(
    (e) => {
      if (lever11.state() == solSwitchboard[0] && lever12.state() == solLever[0]) {
        makeBall(1, ang2[lever22.state()]);
      } else {
        buttonMisfiredSound.getComponent(AudioSource).playOnce();
      }
    },
    {
      button: ActionButton.POINTER,
      hoverText: 'fire'
    }
  )
);

function makeBall(type, state) {
  buttonFiredSound.getComponent(AudioSource).playOnce();
  switch (type) {
    case 0:
      ball1.create(state);
      break;
    case 1:
      ball2.create(state);
      break;
  }
}

















/*
/// --- Set up a system ---

class RotatorSystem {
  // this group will contain every entity that has a Transform component
  group = engine.getComponentGroup(Transform)

  update(dt: number) {
    // iterate over the entities of the group
    for (let entity of this.group.entities) {
      // get the Transform component of the entity
      const transform = entity.getComponent(Transform)

      // mutate the rotation
      transform.rotate(Vector3.Up(), dt * 10)
    }
  }
}

// Add a new instance of the system to the engine
engine.addSystem(new RotatorSystem())

/// --- Spawner function ---

function spawnCube(x: number, y: number, z: number) {
  // create the entity
  const cube = new Entity()

  // add a transform to the entity
  cube.addComponent(new Transform({ position: new Vector3(x, y, z) }))

  // add a shape to the entity
  cube.addComponent(new BoxShape())

  // add the entity to the engine
  engine.addEntity(cube)

  return cube
}

/// --- Spawn a cube ---

const cube = spawnCube(8, 1, 8)

cube.addComponent(
  new OnClick(() => {
    cube.getComponent(Transform).scale.z *= 1.1
    cube.getComponent(Transform).scale.x *= 0.9

    spawnCube(Math.random() * 8 + 1, Math.random() * 8, Math.random() * 8 + 1)
  })
)
*/

// Drawing board
const drawingboard = new Entity();
drawingboard.addComponent(new GLTFShape('models/drawingboard/drawingboard.glb'));
drawingboard.addComponent(new Transform({ 
  position: new Vector3(24, -0.15, 24), 
  scale: new Vector3(0.225, 0.225, 0.225)
}));
engine.addEntity(drawingboard);