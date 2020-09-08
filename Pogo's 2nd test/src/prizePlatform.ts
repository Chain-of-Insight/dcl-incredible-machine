import { MoveTransformComponent } from "../node_modules/decentraland-ecs-utils/transform/component/move";
import { Platform } from "./platform";
import decentralandEcsUtils from "../node_modules/decentraland-ecs-utils/index";
import utils from "../node_modules/decentraland-ecs-utils/index";


export class PrizePlatform {
    public static solved = false;
    public static elevator;

    static createPlatforms(){

        const model = new GLTFShape('models/platform/platform.glb')
        const model2 = new GLTFShape('models/platform/oldboard.glb')
        const audio = new AudioClip('sounds/platform-moving.mp3')

        const staticPlatform = new Platform(
            model2,
            audio,
            new Transform({ position: new Vector3(61,10,30), rotation: Quaternion.Euler(0, 90, 0) })
        )

        this.elevator = new Platform(
            model2,
            audio,
            new Transform({ position: new Vector3(56,10,30) })
        )
    }

    static moveElevator(){
        let state1 = this.elevator.getComponent(Transform).position
        let state2 = new Vector3(state1.x, state1.y, state1.z)
        if (state2.y != 0){
            state2.y = 0
        } else {
            state2.y = 10
        }
        let duration = (state1.y+state2.y)* 0.25;
        this.elevator.addComponentOrReplace(
            new MoveTransformComponent(
                state1,
                state2,
                duration,
                () => { 
                    this.elevator.addComponent(
                        new utils.Interval(
                            2000,
                            () => { 
                                this.elevator.removeComponent(utils.Interval)
                                this.moveElevator() 
                            })
                    )
                }
            )
        )
    }
}