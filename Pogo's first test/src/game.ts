import { createChannel } from '../node_modules/decentraland-builder-scripts/channel'
import { createInventory } from '../node_modules/decentraland-builder-scripts/inventory'
import Script1 from "../6464f5ed-d97d-49fc-9c99-4f9e2069dc71/src/item"
import Script2 from "../4bf77c44-42db-4134-90f0-06da4202ff04/src/item"
import {MovableEntity} from 'src/MovableEntity'
import { Switchboard } from "./switchboard"
import { Button } from "./button";

/*
// Define the system
export class MoveSystem implements ISystem {
  //Executed ths function on every frame
  update() {
    // Iterate over the entities in an component group
    for (let entity of myEntityGroup.entities) {
      let transform = entity.getComponent(Transform)
      transform.translate(Vector3.Forward)
    }
  }
}
*/

const _scene = new Entity('_scene')
engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
_scene.addComponentOrReplace(transform)

const entity = new Entity('entity')
engine.addEntity(entity)
entity.setParent(_scene)
const gltfShape = new GLTFShape("models/FloorFantasyRocks_02/FloorFantasyRocks_02.glb")
gltfShape.withCollisions = true
gltfShape.isPointerBlocker = true
gltfShape.visible = true
entity.addComponentOrReplace(gltfShape)
const transform2 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity.addComponentOrReplace(transform2)

const entity2 = new Entity('entity2')
engine.addEntity(entity2)
entity2.setParent(_scene)
entity2.addComponentOrReplace(gltfShape)
const transform3 = new Transform({
  position: new Vector3(24, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity2.addComponentOrReplace(transform3)

const entity3 = new Entity('entity3')
engine.addEntity(entity3)
entity3.setParent(_scene)
entity3.addComponentOrReplace(gltfShape)
const transform4 = new Transform({
  position: new Vector3(40, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity3.addComponentOrReplace(transform4)

const entity4 = new Entity('entity4')
engine.addEntity(entity4)
entity4.setParent(_scene)
entity4.addComponentOrReplace(gltfShape)
const transform5 = new Transform({
  position: new Vector3(56, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity4.addComponentOrReplace(transform5)

const entity5 = new Entity('entity5')
engine.addEntity(entity5)
entity5.setParent(_scene)
entity5.addComponentOrReplace(gltfShape)
const transform6 = new Transform({
  position: new Vector3(8, 0, 24),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity5.addComponentOrReplace(transform6)

const entity6 = new Entity('entity6')
engine.addEntity(entity6)
entity6.setParent(_scene)
entity6.addComponentOrReplace(gltfShape)
const transform7 = new Transform({
  position: new Vector3(24, 0, 24),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity6.addComponentOrReplace(transform7)

const entity7 = new Entity('entity7')
engine.addEntity(entity7)
entity7.setParent(_scene)
entity7.addComponentOrReplace(gltfShape)
const transform8 = new Transform({
  position: new Vector3(40, 0, 24),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity7.addComponentOrReplace(transform8)

const entity8 = new Entity('entity8')
engine.addEntity(entity8)
entity8.setParent(_scene)
entity8.addComponentOrReplace(gltfShape)
const transform9 = new Transform({
  position: new Vector3(56, 0, 24),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity8.addComponentOrReplace(transform9)

const entity9 = new Entity('entity9')
engine.addEntity(entity9)
entity9.setParent(_scene)
entity9.addComponentOrReplace(gltfShape)
const transform10 = new Transform({
  position: new Vector3(8, 0, 40),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity9.addComponentOrReplace(transform10)

const entity10 = new Entity('entity10')
engine.addEntity(entity10)
entity10.setParent(_scene)
entity10.addComponentOrReplace(gltfShape)
const transform11 = new Transform({
  position: new Vector3(24, 0, 40),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity10.addComponentOrReplace(transform11)

const entity11 = new Entity('entity11')
engine.addEntity(entity11)
entity11.setParent(_scene)
entity11.addComponentOrReplace(gltfShape)
const transform12 = new Transform({
  position: new Vector3(40, 0, 40),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity11.addComponentOrReplace(transform12)

const entity12 = new Entity('entity12')
engine.addEntity(entity12)
entity12.setParent(_scene)
entity12.addComponentOrReplace(gltfShape)
const transform13 = new Transform({
  position: new Vector3(56, 0, 40),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity12.addComponentOrReplace(transform13)

const entity13 = new Entity('entity13')
engine.addEntity(entity13)
entity13.setParent(_scene)
entity13.addComponentOrReplace(gltfShape)
const transform14 = new Transform({
  position: new Vector3(8, 0, 56),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity13.addComponentOrReplace(transform14)

const entity14 = new Entity('entity14')
engine.addEntity(entity14)
entity14.setParent(_scene)
entity14.addComponentOrReplace(gltfShape)
const transform15 = new Transform({
  position: new Vector3(24, 0, 56),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity14.addComponentOrReplace(transform15)

const entity15 = new Entity('entity15')
engine.addEntity(entity15)
entity15.setParent(_scene)
entity15.addComponentOrReplace(gltfShape)
const transform16 = new Transform({
  position: new Vector3(40, 0, 56),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity15.addComponentOrReplace(transform16)

const entity16 = new Entity('entity16')
engine.addEntity(entity16)
entity16.setParent(_scene)
entity16.addComponentOrReplace(gltfShape)
const transform17 = new Transform({
  position: new Vector3(56, 0, 56),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity16.addComponentOrReplace(transform17)

const openedWoodenCrate = new Entity('openedWoodenCrate')
engine.addEntity(openedWoodenCrate)
openedWoodenCrate.setParent(_scene)
const transform18 = new Transform({
  position: new Vector3(28, 5, 32.5),
  rotation: new Quaternion(0, 0, 1, 2.9802322387695312e-8),
  scale: new Vector3(1, 1, 1)
})
openedWoodenCrate.addComponentOrReplace(transform18)
const gltfShape2 = new GLTFShape("models/Crate_02/Crate_02.glb")
gltfShape2.withCollisions = true
gltfShape2.isPointerBlocker = true
gltfShape2.visible = true
openedWoodenCrate.addComponentOrReplace(gltfShape2)

const woodenTrapdoor = new Entity('woodenTrapdoor')
engine.addEntity(woodenTrapdoor)
woodenTrapdoor.setParent(_scene)
const transform19 = new Transform({
  position: new Vector3(28, 4, 32.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0.24500000476837158, 0.24500000476837158, 0.24500000476837158)
})
woodenTrapdoor.addComponentOrReplace(transform19)

const scifiLeverConsole = new Entity('scifiLeverConsole')
engine.addEntity(scifiLeverConsole)
scifiLeverConsole.setParent(_scene)
const transform20 = new Transform({
  position: new Vector3(33, 0, 36),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
scifiLeverConsole.addComponentOrReplace(transform20)

const longCurvedVent = new Entity('longCurvedVent')
engine.addEntity(longCurvedVent)
longCurvedVent.setParent(_scene)
const transform21 = new Transform({
  position: new Vector3(31, 0.5, 33),
  rotation: new Quaternion(-0.7071068286895752, 2.412783938165715e-15, 8.429369557916289e-8, 0.7071068286895752),
  scale: new Vector3(1, 1.0000025033950806, 1.0100024938583374)
})
longCurvedVent.addComponentOrReplace(transform21)
const gltfShape3 = new GLTFShape("models/AirVent_Curve_01/AirVent_Curve_01.glb")
gltfShape3.withCollisions = true
gltfShape3.isPointerBlocker = true
gltfShape3.visible = true
longCurvedVent.addComponentOrReplace(gltfShape3)

const soccerBall = new Entity('soccerBall')
engine.addEntity(soccerBall)
soccerBall.setParent(_scene)
const transform22 = new Transform({
  position: new Vector3(28, 4, 32.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
soccerBall.addComponentOrReplace(transform22)
const gltfShape4 = new GLTFShape("models/PlaygroundBall_01/PlaygroundBall_01.glb")
gltfShape4.withCollisions = true
gltfShape4.isPointerBlocker = true
gltfShape4.visible = true
soccerBall.addComponentOrReplace(gltfShape4)




/////////////// TEST CODE GOES BELOW

const switchboard = new Switchboard(
  new GLTFShape('models/switchboard.glb'),
  new Vector3(8, 5, 8), 
  new Vector3(27, 1, 8), 
  new Vector3(8, 0, 8), 
  new Vector3(8, 0, 8)
  )

const button = new Button(new GLTFShape("models/buttonB.glb"), 
  { position: new Vector3(8, 1.5, 20),
  scale: new Vector3(0.3, 0.3, 0.3) }
);
button.addComponent(
  new OnClick((): void => {
    const ball1 = new MovableEntity(
      new GLTFShape("models/PlaygroundBall_01/PlaygroundBall_01.glb"),
      new AudioClip("sounds/coinPickup.mp3"),
      new Vector3(0.5,1,0.5),
      switchboard
    );
  })
);

/////////////////////////////////////////

const channelId = Math.random().toString(16).slice(2)
const channelBus = new MessageBus()
const inventory = createInventory(UICanvas, UIContainerStack, UIImage)
const options = { inventory }

const script1 = new Script1()
const script2 = new Script2()
script1.init(options)
script2.init(options)
script1.spawn(woodenTrapdoor, {}, createChannel(channelId, woodenTrapdoor, channelBus))
script2.spawn(scifiLeverConsole, {"onActivate":[{"entityName":"woodenTrapdoor","actionId":"open","values":{}}],"onDeactivate":[{"entityName":"woodenTrapdoor","actionId":"close","values":{}}]}, createChannel(channelId, scifiLeverConsole, channelBus))