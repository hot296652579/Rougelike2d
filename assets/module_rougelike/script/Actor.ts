/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2024-07-17 10:43:35
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2024-07-18 07:53:00
 * @FilePath: /RougelikeGame2D/assets/module_rougelike/script/Actor.ts
 * @Description: 人物怪物基类,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Animation, Component, RigidBody2D, Vec2, Vec3, _decorator } from "cc";
import { ActorState } from "./State";
const { ccclass, property } = _decorator;


// 定义8个朝向
const directions = [
    { name: '右', angle: 0, dir: 'right' },
    { name: '右上', angle: 45, dir: 'right-up' },
    { name: '上', angle: 90, dir: 'up' },
    { name: '左上', angle: 135, dir: 'left-up' },
    { name: '左', angle: 180, dir: 'left' },
    { name: '左下', angle: 225, dir: 'left-down' },
    { name: '下', angle: 270, dir: 'down' },
    { name: '右下', angle: 315, dir: 'right-down' },
];

@ccclass("Actor")
export class Actor extends Component {

    state: ActorState = ActorState.Idle;

    rigidBody: RigidBody2D = null;
    animation: Animation = null;
    linearSpeed: number = 10;

    inputVector: Vec2 = new Vec2();

    speed: number = 100;
    angle: number = 0;

    start(): void {
        this.animation = this.node.getComponent(Animation)!;
        this.rigidBody = this.node.getComponent(RigidBody2D)!;
    }

    update(dt: number): void {
        switch (this.state) {
            case ActorState.Walk:
                this.onDirection();
                this.onMoving();
                break;

            default:
                break;
        }
    }

    /**
     * @description: 人物转向
     * @return {*}
     */
    protected onDirection(): void {
        if (this.inputVector.length() > 0) {
            // 将角度转换为0-360度
            if (this.angle < 0) {
                this.angle += 360;
            }
            // console.log(`角度 angle:${this.angle}`);

            // 找到最接近的朝向
            let minDiff = 360;
            let direction = directions[0].dir;

            directions.forEach((dir) => {
                let diff = Math.abs(this.angle - dir.angle);
                if (diff > 180) {
                    diff = 360 - diff;
                }
                if (diff < minDiff) {
                    minDiff = diff;
                    direction = dir.dir;
                }
            });

            const defaultScale: number = 1;
            if (direction == 'left-up' || direction == 'left' || direction == 'left-down') {
                this.node.scale = new Vec3(defaultScale, defaultScale, defaultScale);
            } else if (direction == 'right-up' || direction == 'right' || direction == 'right-down') {
                this.node.scale = new Vec3(-defaultScale, defaultScale, defaultScale);
            }
        }
    }

    private playAnimationByState() {
        switch (this.state) {
            case ActorState.Idle:
                this.animation.crossFade('player_left_idle', 0.3);
                break;
            case ActorState.Walk:
                this.animation.crossFade('player_left_walk', 0.3);
                break;
        }
    }

    private onMoving(): void {
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
        this.playAnimationByState();
    }
}

