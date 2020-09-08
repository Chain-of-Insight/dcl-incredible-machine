import * as ui from '../node_modules/@dcl/ui-utils/index';

import { Ball } from './ball';
import { Switchboard } from "./switchboard";
import { Button } from "./button";
import { Lever } from "./lever";
import { PuzzlePiece } from "./puzzlePiece"
import { Plants } from './plants';
import { PrizePlatform } from './prizePlatform'

// NPC
import { PhysicistNPC, IntroText, FirstHitText, FinalHitText } from './messenger';

// Display introduction message
let messenger = new PhysicistNPC(IntroText, 0);

Plants.buildPlants()
PrizePlatform.createPlatforms()


let angles1: Array<Vector3> = [ new Vector3(1, 33, 45), new Vector3(1, 85, 45) ]
const puzzlePiece1 = new PuzzlePiece(
  new Vector3(8, -0.13, 8),
  new Vector3(20, 5, 8),
  new Vector3(33,0,20),
  new Vector3(27, 10, 13),
  angles1,
  new Quaternion(0, 0, 0, 1),
  messenger
)

let angles2: Array<Vector3> = [ new Vector3(0.8, 30, 35), new Vector3(0.95, 0, 35) ]
const puzzlePiece2 = new PuzzlePiece(
  new Vector3(15, 9, 33),
  new Vector3(27, 6, 33), 
  new Vector3(33,0,25),
  new Vector3(33, 11, 33),
  angles2,
  new Quaternion(0, -90, 0, 1),
  messenger
)


// Buttons
const button1 = new Button(
  new GLTFShape("models/buttons/firebutton.glb"), 
  { 
    position: new Vector3(30, 1.5, 19),
    scale: new Vector3(0.3, 0.3, 0.3) 
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


button1.addComponent(
  new OnPointerDown(
    (e) => {
      messenger.reset()
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


/*
const button2 = new Button(
  new GLTFShape("models/buttons/firebutton.glb"), 
  { 
    position: new Vector3(30, 1.5, 26),
    scale: new Vector3(0.3, 0.3, 0.3),
    rotation: new Quaternion(0, -20, 0, 1)
  }
);

button2.addComponent(
  new OnPointerDown(
    (e) => {
      if (puzzlePiece1.checkSol(0)) {
        puzzlePiece2.makeBall(1)
      } 
    },
    {
      button: ActionButton.POINTER,
      hoverText: 'fire'
    }
  )
);
*/

// XXX @pogo: I have been unable to draw or display                     !!!!!!!!!!!!!!!!!
// anything on the drawing board (irony) so 
// seems we won't be able to use it :(

// Drawing board
// const drawingboard = new Entity();
// drawingboard.addComponent(new GLTFShape('models/drawingboard/drawingboard.glb'));
// drawingboard.addComponent(new Transform({ 
//   position: new Vector3(24, -0.15, 24), 
//   scale: new Vector3(0.225, 0.225, 0.225)
// }));
// engine.addEntity(drawingboard);

