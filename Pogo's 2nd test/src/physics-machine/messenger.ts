import * as ui from '../../node_modules/@dcl/ui-utils/index';
import { Dialog, ImageData } from '../../node_modules/@dcl/ui-utils/utils/types';
import { PrizePlatform } from "./prizePlatform"

const PHYSICIST_PORTRAIT = 'models/physics-machine/dialog/physicist.png';
const BOTH_NPCS_PORTRAIT = 'models/physics-machine/dialog/bothnpc.png';


export class PhysicistNPC {
  public numHits = 0;
  public maxHits = 4;
  public hitCounter: ui.UICounter;
  public displayedFirst = false;
  public displayedLast = false;
  public icon: ui.SmallIcon;
  public dialog2: ui.DialogWindow;
  constructor(
    private dialog: ui.DialogWindow = null
  ) {
    this.dialog = new ui.DialogWindow(
      { 
        path: PHYSICIST_PORTRAIT
      }, 
      true // Dark theme
    );

    this.icon = new ui.SmallIcon(
      'models/physics-machine/icons/target.png', 
      // x, y
      -80, 80, 
      // Width, height
      48, 48
    );
    this.hitCounter = new ui.UICounter(this.numHits, -15, 80);

    this.dialog.openDialogWindow(this.IntroText, 0);
  }

  onHit(){
    this.numHits++
    this.hitCounter.increase()
  }
  
  reset(){
    this.hitCounter.set(0)
    this.numHits = 0
  }

  hardReset(){
    this.hitCounter.set(0)
    this.numHits = 0
    this.displayedFirst = false
    this.displayedLast = false
  }

  public dispMessage(){
    if (this.numHits>0){
      if (this.numHits < this.maxHits && !this.displayedFirst){
        this.dialog.openDialogWindow(this.FirstHitText, 0);
        this.displayedFirst = true
      } else {
        if (this.numHits == this.maxHits){
          this.dialog.openDialogWindow(this.FinalHitText, 0);
          this.displayedLast = true
          PrizePlatform.endGame()
        }
      }
    }
  }

  public dispFinalMessage(){
    let dialog2 = new ui.DialogWindow(
      { 
        path: BOTH_NPCS_PORTRAIT
      }, 
      true // Dark theme
    );

    dialog2.openDialogWindow(this.FinalText, 0);
  }



  // Physicist
  IntroText: Dialog[] = [
    {
      text: 'You\'re just in time to test my incredible machine!'
    },
    {
      text: 'Oh...and you\'re carrying gallium-aluminum mixture? I can use that for my invention, thanks!'
    },
    {
      text: 'Help me determine the correct firing angles and positions for these turrets',
    },
    {
      text: 'Calculate with precision before wasting precious time, haha. Good luck!',
      isEndOfDialog: true
    }
  ];

  FirstHitText: Dialog[] = [
    {
      text: 'A direct hit great job!'
    },
    {
      text: 'Hrmm...one turret keeps getting stuck, did you figure out why?',
      isEndOfDialog: true
    }
  ];

  FinalHitText: Dialog[] = [
    {
      text: 'Wow, you\'re a pro! I\'ve gathered all the data I need on these turrets',
      isEndOfDialog: true
    }
  ];

  FinalText: Dialog[] = [
    {
      text: 'Great job! You solved our challenges',
    },
    {
      text: 'Hope you enjoyed our reactions and et cetera',
    },
    {
      text: 'Your treasure awaits!',
      isEndOfDialog: true
    }
  ];
}