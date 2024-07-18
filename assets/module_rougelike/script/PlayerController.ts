
/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2024-07-17 11:03:04
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2024-07-18 15:52:17
 * @FilePath: /RougelikeGame2D/assets/module_rougelike/script/PlayerController.ts
 * @Description: 玩家控制器,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { _decorator } from "cc";
import { JoyStickMgr } from "./JoyStickMgr";
import { ActorState } from "./State";
import { BaseCharacter } from "./base/BaseCharacter";
const { ccclass, property, requireComponent } = _decorator;

@ccclass("PlayerController")
export class PlayerController extends BaseCharacter {
    joystick: JoyStickMgr = null;

    start(): void {
        super.start();
        this.joystick = this.node.parent.getComponentInChildren(JoyStickMgr);
    }

    update(dt: number): void {
        super.update(dt);
        this.inputVector = this.joystick.inputVec;
        this.angle = this.joystick.angle;
        if (this.inputVector.length() > 0) {
            this.changeState(ActorState.Walk);
        } else {
            this.changeState(ActorState.Idle);
        }
    }
}

