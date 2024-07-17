
/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2024-07-17 11:03:04
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2024-07-17 11:11:58
 * @FilePath: /RougelikeGame2D/assets/module_rougelike/script/PlayerController.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Component, _decorator } from "cc";
import { Actor } from "./Actor";
import { JoyStickMgr } from "./JoyStickMgr";
import { ActorState } from "./State";
const { ccclass, property, requireComponent } = _decorator;

@ccclass("PlayerController")
@requireComponent(Actor)
export class PlayerController extends Component {
    joystick: JoyStickMgr = null;

    actor: Actor = null;
    protected start(): void {
        this.joystick = this.node.parent.getComponentInChildren(JoyStickMgr);
        this.actor = this.getComponent(Actor);
    }

    protected update(dt: number): void {
        this.actor.inputVector = this.joystick.inputVec;
        if (this.actor.inputVector.length() > 0) {
            this.actor.changeState(ActorState.Walk);
        } else {
            this.actor.changeState(ActorState.Idle);
        }
    }
}

