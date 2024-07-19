/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2024-07-18 16:40:27
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2024-07-19 16:20:36
 * @FilePath: /RougelikeGame2D/assets/module_rougelike/script/enemy/MeleeEnemyController.ts
 * @Description: 蓝色小怪物,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { _decorator } from "cc";
import { ActorState } from "../State";
import { ICharacter } from "../base/BaseCharacter";
import { EnemyController } from "./EnemyController";
const { ccclass, property } = _decorator;

@ccclass("BlueSlimeEnemy")
export class BlueSlimeEnemy extends EnemyController {

    protected attackPlayer(): void {
        if (this.state !== ActorState.Attack) {
            this.changeState(ActorState.Attack);
            this.attack(this.player);
        }
    }

    playAnimationByState(): void {
        super.playAnimationByState();

        switch (this.state) {
            case ActorState.Idle:
                this.animation.crossFade('blue_slime_idle', 0.3);
                break;
            case ActorState.Walk:
                this.animation.crossFade('blue_slime_walk', 0.3);
                break;
            case ActorState.Attack:
                this.animation.crossFade('blue_slime_attack', 0.3);
                break;
            case ActorState.Hit:
                this.animation.crossFade('blue_slime_hit', 0.3);
                break;
        }
    }

    attackFinish(): void {
        this.changeState(ActorState.Idle);
    }

    attack(target: ICharacter): void {
        super.attack(target);

        this.player?.takeDamage(this.baseAttack);
    }

    takeDamage(damge: number): void {
        super.takeDamage(damge);
        this.changeState(ActorState.Hit);
        // console.log('小蓝怪物受伤');
    }
}