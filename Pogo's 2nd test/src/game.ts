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

// the 4 plant positions
let pos1 = new Vector3(31,0,25)
let pos2 = new Vector3(32,0,35)
let pos3 = new Vector3(43,0,35)
let pos4 = new Vector3(42,0,25)
Plants.buildPlants(pos1, pos2, pos3, pos4)
PrizePlatform.createPlatforms()


let angles1: Array<Vector3> = [ new Vector3(1, 33, 45), new Vector3(1, 15, 45) ]
const puzzlePiece1 = new PuzzlePiece(
  new Vector3(8, -0.13, 8),
  new Vector3(20, 5, 8),
  new Vector3(33,0,27),
  new Vector3(30.08, 10.22, 14.54),
  angles1,
  new Quaternion(0, 0, 0, 1),
  messenger,
  0
)

let angles2: Array<Vector3> = [new Vector3(0.9, -10, 35), new Vector3(1, -54, 40) ]
const puzzlePiece2 = new PuzzlePiece(
  new Vector3(27, 6, 50), 
  new Vector3(15, 9, 50),
  new Vector3(33, 0, 33),
  new Vector3(33, 11, 40),
  angles2,
  new Quaternion(0, -90, 0, 1),
  messenger,
  1
)


let angles3: Array<Vector3> = [ new Vector3(1, 205, 40), new Vector3(0.9, 195, 45) ]
const puzzlePiece3 = new PuzzlePiece(
  new Vector3(50, 8, 40), 
  new Vector3(50, 12, 50),
  new Vector3(44, 0, 33),
  new Vector3(32.78, 10.91, 45.38),
  angles3,
  new Quaternion(0, -180, 0, 1),
  messenger,
  2
)

let angles4: Array<Vector3> = [ new Vector3(1, 165, 30), new Vector3(1, 150 , 20) ]
const puzzlePiece4 = new PuzzlePiece(
  new Vector3(60, 15, 10), 
  new Vector3(58, 20, 10),
  new Vector3(44, 0, 27),
  new Vector3(27.66, 6.68, 18.12),
  angles4,
  new Quaternion(0, 0, 0, 1),
  messenger,
  3
)


// Buttons
const button1 = new Button(
  new GLTFShape("models/buttons/firebutton.glb"), 
  { 
    position: new Vector3(30, 1.5, 30),
    scale: new Vector3(0.3, 0.3, 0.3),
    rotation: Quaternion.Euler(0, 90, 0)
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
          if (puzzlePiece3.makeBall(2)){
            puzzlePiece4.makeBall(3)
          }
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

