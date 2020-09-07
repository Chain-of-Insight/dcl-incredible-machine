import * as ui from '../node_modules/@dcl/ui-utils/index';
import { Dialog } from '../node_modules/@dcl/ui-utils/utils/types';

const ALCHEMIST_PORTRAIT = 'models/dialog/alchemist.png';

export class AlchemistNPC {
  constructor(
    public message: Dialog[],
    public messageIndex: number,
    private dialog: ui.DialogWindow = null
  ) {
    this.dialog = new ui.DialogWindow(
      { 
        path: ALCHEMIST_PORTRAIT
      }, 
      true // Dark theme
    );
    this.dialog.openDialogWindow(this.message, this.messageIndex);
  }
}

export const IntroText: Dialog[] = [
  {
    text: 'Hi there, welcome to my incredible alchemy station!'
  },
  {
    text: 'Hrmm...that door over there seems to be made of a lightweight, shiny metal'
  },
  {
    text: 'Alas, alchemy is an imprecise science. Even the correct solution might yield poor results',
  },
  {
    text: 'Calculate with precision before wasting precious time, haha. Good luck!',
    isEndOfDialog: true
  }
];

export const HasGalliumText: Dialog[] = [
  {
    text: 'Wow, so you were able to make gallium. Impressive!'
  },
  {
    text: 'Gallium can devour many lightweight metals. Why don\'t you try applying some to that door',
    isEndOfDialog: true
  }
];

export const GalliumApplyNotReady: Dialog[] = [
  {
    text: 'You seem to be on the right track'
  },
  {
    text: 'Give the gallium a little more time to do it\'s thing',
    isEndOfDialog: true
  }
];

export const KeepHittingText: Dialog[] = [
  {
    text: 'A piece just broke off, I think it\'s working',
    isEndOfDialog: true
  }
];