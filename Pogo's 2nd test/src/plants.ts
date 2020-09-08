import { Solution } from "./solution"
import { Plant } from "./plant"


const plantModel1 = new GLTFShape("models/plants/plant1.glb")
const plantModel2 = new GLTFShape("models/plants/plant2.glb")
const audioClip1 = new AudioClip("sounds/plantlow.mp3")
const audioClip2 = new AudioClip("sounds/planthigh.mp3")

export class Plants {
    static buildPlants(){
        let pos = new Vector3(32,0,1)
        let offset = new Vector3(-1,0,0)
        const plant1 = new Plant(
            this.randomModel(),
            this.sound(0),
            new Transform({ position: pos, scale: this.shape(0) })
        )
        
        const plant2 = new Plant(
            this.randomModel(),
            this.sound(1),
            new Transform({ position: pos.add(offset), scale: this.shape(1) })
        )

        const plant3 = new Plant(
            this.randomModel(),
            this.sound(2),
            new Transform({ position: pos.add(offset).add(offset), scale: this.shape(2) })
        )
    }

    // encodes the lever solutions
    private static shape(i:number):Vector3 {
        let switchVal = Solution.solLever[i]
        if (switchVal == 0){
            return new Vector3(1, 1, 1)
        } else {
            return new Vector3(1.1, 1.1, 1.1)
        }
    }

    // encodes the platform solutions
    private static sound(i:number):AudioClip {
        let switchVal = Solution.solSwitchboard[i]
        if (switchVal == 0){
            return audioClip1
        } else {
            return audioClip2
        }
    }

    // the plant model is a red herring
    private static randomModel():GLTFShape {
        let i = this.getRandomBinary()
        if (i == 0){
            return plantModel1
        } else {
            return plantModel2
        }
    }

    // returns 0 or 1
    private static getRandomBinary(): number{
        return Math.floor(Math.random() * Math.floor(2))
    }
}