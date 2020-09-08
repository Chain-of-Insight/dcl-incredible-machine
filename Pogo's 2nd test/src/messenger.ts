import * as ui from '../node_modules/@dcl/ui-utils/index';
import { Dialog } from '../node_modules/@dcl/ui-utils/utils/types';
import { PrizePlatform } from "./prizePlatform"

const PHYSICIST_PORTRAIT = 'models/dialog/physicist.png';

export class PhysicistNPC {
  public numHits = 0;
  public maxHits = 2;
  public hitCounter
  public displayedFirst = false
  public displayedLast = false
  constructor(
    public message: Dialog[],
    public messageIndex: number,
    private dialog: ui.DialogWindow = null
  ) {
    this.dialog = new ui.DialogWindow(
      { 
        path: PHYSICIST_PORTRAIT
      }, 
      true // Dark theme
    );

    // XXX @pogo:
    let targetIcon = new ui.SmallIcon(
      'models/icons/target.png', 
      // x, y
      -80, 80, 
      // Width, height
      48, 48
    );
    this.hitCounter = new ui.UICounter(this.numHits, -15, 80);

    this.dialog.openDialogWindow(this.message, this.messageIndex);
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
        this.dialog.openDialogWindow(FirstHitText, 0);
        this.displayedFirst = true
      } else {
        if (this.numHits == this.maxHits){
          this.dialog.openDialogWindow(FinalHitText, 0);
          this.displayedLast = true
          PrizePlatform.moveElevator()
        }
      }
    }
  }
}

// Physicist
export const IntroText: Dialog[] = [
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

export const FirstHitText: Dialog[] = [
  {
    text: 'A direct hit great job!'
  },
  {
    text: 'Hrmm...one turret keeps getting stuck, did you figure out why?',
    isEndOfDialog: true
  }
];

export const FinalHitText: Dialog[] = [
  {
    text: 'Wow, you\'re a pro! I\'ve gathered all the data I need on these turrets'
  },
  {
    text: 'And the final chain reaction has been triggered, congratulations!',
    isEndOfDialog: true
  }
];