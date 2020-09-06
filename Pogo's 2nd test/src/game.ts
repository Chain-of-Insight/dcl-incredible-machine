import { MovableEntity } from './movableEntity'
import { Switchboard } from "./switchboard"
import { Button } from "./button"
import { Lever } from "./lever"
import utils from "../node_modules/decentraland-ecs-utils/index";

let solSwitchboard: Array<number> = [ 1, 1, 0, 1, 0, 0 ] 
let solLever: Array<number> = [ 1, 1, 0, 1, 0, 0 ]


// FIRST ITEMSET //////////////////////////////////////////

// First switchboard
const switchboard1 = new Switchboard(
  new GLTFShape('models/switchboard.glb'),
  new Vector3(8, 1, 8), 
  new Vector3(27, 5, 8)
  )

// First lever, switchboard control
const lever11 = new Lever(new GLTFShape('4bf77c44-42db-4134-90f0-06da4202ff04/models/Lever_Console.glb'),
  { position: new Vector3(33,0,20) }
);
lever11.addComponent(
  new OnClick((): void => {
    switchboard1.toggle()
    lever11.toggle()
  })
);

// First lever, angle control
let ang1: Array<Vector3> = [ new Vector3(1, 30, 45), new Vector3(1, 90, 30) ]
const lever12 = new Lever(new GLTFShape('4bf77c44-42db-4134-90f0-06da4202ff04/models/Lever_Console.glb'),
  { position: new Vector3(32,0,20) }
);
lever12.addComponent(
  new OnClick((): void => {
    lever12.toggle()
  })
);
////////////////////////////////////////////////////





// SECOND ITEMSET //////////////////////////////////////////

// 2nd switchboard
const switchboard2 = new Switchboard(
  new GLTFShape('models/switchboard.glb'),
  new Vector3(27, 6, 33), 
  new Vector3(15, 9, 33)
  )

// 2nd lever, switchboard control
const lever21 = new Lever(new GLTFShape('4bf77c44-42db-4134-90f0-06da4202ff04/models/Lever_Console.glb'),
  { position: new Vector3(33,0,25) }
);
lever21.addComponent(
  new OnClick((): void => {
    switchboard2.toggle()
    lever21.toggle()
  })
);

// 2nd lever, angle control
let ang2: Array<Vector3> = [ new Vector3(0.5, 30, 40), new Vector3(1, 30, 35) ]
const lever22 = new Lever(new GLTFShape('4bf77c44-42db-4134-90f0-06da4202ff04/models/Lever_Console.glb'),
  { position: new Vector3(32,0,25) }
);
lever22.addComponent(
  new OnClick((): void => {
    lever22.toggle()
  })
);
////////////////////////////////////////////////////






let levers: Array<Lever> = [ lever11, lever12, lever21, lever22 ]

const button = new Button(new GLTFShape("models/buttonB.glb"), 
  { position: new Vector3(30, 1.5, 20),
   scale: new Vector3(0.3, 0.3, 0.3) }
);

const ball1 = new MovableEntity(
  new GLTFShape("models/soccerBall.glb"),
  new AudioClip("sounds/coinPickup.mp3"),
  ang1[lever12.state()],  // r, theta, phi, phi controls height
  switchboard1,
  false,
  false,
  null,
  null,
);

const ball2 = new MovableEntity(
  new GLTFShape("models/soccerBall.glb"),
  new AudioClip("sounds/coinPickup.mp3"),
  ang2[lever22.state()],  // r, theta, phi, phi controls height
  switchboard2,
  false,
  false,
  null,
  null,
);

button.addComponent(
  new OnPointerDown(
    (e) => {

    makeBall(0, ang2[lever12.state()]);
    
    if (lever11.state() == solSwitchboard[0] && lever12.state() == solLever[0]){
      makeBall(1, ang2[lever22.state()]);
      /*
      new utils.Interval(100, (): void => {
        if (ball1.hasFinished || !ball1.hasFinished){
          const ball2 = new MovableEntity(
            new GLTFShape("models/soccerBall.glb"),
            new AudioClip("sounds/coinPickup.mp3"),
            ang2[lever22.state()],  // r, theta, phi, phi controls height
            switchboard2
          );
        }
      });
      */
    }
  },
  { 
    button: ActionButton.POINTER,
    hoverText: 'fire'
  }
  )
);

function makeBall(type, state) {
  switch (type) {
    case 0:
      ball1.create(state);
      log('ball1', ball1);
      break;
    case 1:
      ball2.create(state);
      log('ball2', ball2);
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
