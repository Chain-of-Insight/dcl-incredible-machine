import { MovableEntity } from './MovableEntity'
import { Switchboard } from "./switchboard"
import { Button } from "./button"



const switchboard = new Switchboard(
  new GLTFShape('models/switchboard.glb'),
  new Vector3(8, 5, 8), 
  new Vector3(27, 1, 8), 
  new Vector3(8, 0, 8), 
  new Vector3(8, 0, 8)
  )

const button = new Button(new GLTFShape("models/buttonB.glb"), 
  { position: new Vector3(8, 1.5, 30),
  scale: new Vector3(0.3, 0.3, 0.3) }
);

button.addComponent(
  new OnClick((): void => {
    const ball1 = new MovableEntity(
      new GLTFShape("models/soccerBall.glb"),
      new AudioClip("sounds/coinPickup.mp3"),
      new Vector3(0.5, 1.5, 1.5),
      switchboard
    );
  })
);















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
