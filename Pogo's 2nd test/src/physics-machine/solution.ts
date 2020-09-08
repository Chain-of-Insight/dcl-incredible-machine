
export class Solution {
    public static solSwitchboard: Array<number> = [ 1, 0, 1, 1 ];
    public static solLever: Array<number> = [ 0, 1, 1, 0 ];

    // this doesn't work without dynamic targets, which are not yet implemented
    public static randomizeSolution(){
        this.solSwitchboard[0] = this.getRandomBinary()
        this.solSwitchboard[1] = this.getRandomBinary()
        this.solSwitchboard[2] = this.getRandomBinary()
        this.solSwitchboard[3] = this.getRandomBinary()
        this.solLever[0] = this.getRandomBinary()
        this.solLever[1] = this.getRandomBinary()
        this.solLever[2] = this.getRandomBinary()
        this.solLever[3] = this.getRandomBinary()
    }

  // returns 0 or 1
  private static getRandomBinary(): number {
    // return Math.floor(Math.random() * Math.floor(2))
    let randomBoolean = Math.random() >= 0.5;
    if (randomBoolean)
      return 1;
    else
      return 0;
  }
}