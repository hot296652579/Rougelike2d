/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2024-07-17 10:43:35
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2024-07-17 13:16:29
 * @FilePath: /RougelikeGame2D/assets/module_rougelike/script/Actor.ts
 * @Description: 人物怪物基类,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Component, RigidBody2D, Vec2, _decorator } from "cc";
import { ActorState } from "./State";
const { ccclass, property } = _decorator;

@ccclass("Actor")
export class Actor extends Component {

    state: ActorState = ActorState.Idle;

    rigidBody: RigidBody2D = null;
    linearSpeed: number = 10;

    inputVector: Vec2 = new Vec2();

    speed: number = 100;

    start(): void {
        this.rigidBody = this.node.getComponent(RigidBody2D)!;
    }

    update(dt: number): void {
        switch (this.state) {
            case ActorState.Walk:
                this.moving();
                break;

            default:
                break;
        }
    }

    private moving(): void {
        if (this.inputVector.length() > 0) {
            const velocity = this.inputVector.normalize().multiplyScalar(this.linearSpeed);
            this.rigidBody.linearVelocity = velocity;
        }
    }

    private stopMove(): void {
        this.rigidBody.linearVelocity = Vec2.ZERO;
    }

    changeState(state: ActorState) {
        if (this.state == ActorState.Die) return;

        if (this.state != ActorState.Walk) {
            this.stopMove();
        }
        this.state = state;
        //DOTO 动画播放
    }
}

