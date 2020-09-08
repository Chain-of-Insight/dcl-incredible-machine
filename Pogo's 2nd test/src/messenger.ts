import * as ui from '../node_modules/@dcl/ui-utils/index';
import { Dialog, ImageData } from '../node_modules/@dcl/ui-utils/utils/types';
import { PrizePlatform } from "./prizePlatform"

const PHYSICIST_PORTRAIT = 'models/dialog/physicist.png';
const ALCHEMIST_PORTRAIT = 'models/dialog/alchemist.png';


export class PhysicistNPC {
  public numHits = 0;
  public maxHits = 4;
  public hitCounter: ui.UICounter;
  public displayedFirst = false;
  public displayedLast = false;
  public icon: ui.SmallIcon;
  public dialog2;
  public alchemist: ImageData;
  constructor(
    private dialog: ui.DialogWindow = null
  ) {
    this.dialog = new ui.DialogWindow(
      { 
        path: ALCHEMIST_PORTRAIT
      }, 
      true // Dark theme
    );

    this.icon = new ui.SmallIcon(
      'models/icons/target.png', 
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
    this.alchemist = new ImageData()
    this.alchemist.path = ALCHEMIST_PORTRAIT

    this.dialog.openDialogWindow(this.FinalText, 0);
    //this.dialog2.openDialogWindow(FinalText2, 0);
    //this.dialog.openDialogWindow(FinalText3, 0);
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
    text: 'Wow, you\'re a pro! I\'ve gathered all the data I need on these turrets'
  },
  {
    text: 'Please head towards the right arrow to get to the treasure chest',
    isEndOfDialog: true
  }
];

FinalText: Dialog[] = [
  {
    text: 'Great job! You\'ve solved our challenges',
  },
  {
    text: 'This was fun for us to build',
  },
  {
    text: 'And we hope you enjoyed playing it',
    portrait: this.alchemist,
  },
  {
    text: '... and that, of course!',
    isEndOfDialog: true
  }
]
}