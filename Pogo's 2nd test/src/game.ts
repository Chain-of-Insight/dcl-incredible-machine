import { Ball } from './ball';
import { Switchboard } from "./switchboard";
import { Button } from "./button";
import { Lever } from "./lever";
import { PuzzlePiece } from './puzzlePiece';
import decentralandEcsUtils from '../node_modules/decentraland-ecs-utils/index';


let angles1: Array<Vector3> = [ new Vector3(1, 30, 45), new Vector3(1, 90, 30) ]
const puzzlePiece1 = new PuzzlePiece(
  new Vector3(8, -0.13, 8),
  new Vector3(27, 5, 8),
  new Vector3(33,0,20),
  new Vector3(34, 10, 13),
  angles1
)

let angles2: Array<Vector3> = [ new Vector3(0.5, 30, 40), new Vector3(1, 60, 35) ]
const puzzlePiece2 = new PuzzlePiece(
  new Vector3(27, 6, 33), 
  new Vector3(15, 9, 33),
  new Vector3(33,0,25),
  new Vector3(33, 11, 43),
  angles2
)

/*
let angles3: Array<Vector3> = [ new Vector3(0.75, -35, 40), new Vector3(75, -30, 15) ]
const puzzlePiece3 = new PuzzlePiece(
  new Vector3(50, 3, 50), 
  new Vector3(50, 15, 50),
  new Vector3(33,0,30),
  angles3
)
*/


// Button
const button = new Button(new GLTFShape("models/buttons/firebutton.glb"), 
  { position: new Vector3(30, 1.5, 20),
   scale: new Vector3(0.3, 0.3, 0.3) }
);

button.addComponent(
  new OnPointerDown(
    (e) => {
      if (puzzlePiece1.makeBall(0)){
        if (puzzlePiece2.makeBall(1)){
          //puzzlePiece3.makeBall(2)
        }
      }
    },
    { 
      button: ActionButton.POINTER,
      hoverText: 'fire'
    }
  )
);



// Drawing board
const drawingboard = new Entity();
drawingboard.addComponent(new GLTFShape('models/drawingboard/drawingboard.glb'));
drawingboard.addComponent(new Transform({ 
  position: new Vector3(24, -0.15, 24), 
  scale: new Vector3(0.225, 0.225, 0.225)
}));
engine.addEntity(drawingboard);














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