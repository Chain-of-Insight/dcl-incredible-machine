import * as ui from '../node_modules/@dcl/ui-utils/index';
import { Dialog } from '../node_modules/@dcl/ui-utils/utils/types';

const PHYSICIST_PORTRAIT = 'models/dialog/physicist.png';

export class PhysicistNPC {
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
    this.dialog.openDialogWindow(this.message, this.messageIndex);
  }
}

// Physicist
export const IntroText: Dialog[] = [
  {
    text: 'Hi there, you\'re just in time to test my incredible machine!'
  },
  {
    text: 'Oh...you\'re carrying gallium-aluminum mixture? I can use that for my invention, thanks!'
  },
  {
    text: 'Help me determine the correct firing distance of these turrets so I can complete the reaction chain',
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
    text: 'You\'re a pro, wow!'
  },
  {
    text: 'The final chain reaction has been triggered, congratulations!',
    isEndOfDialog: true
  }
];