
/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2024-07-17 11:03:04
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2024-07-18 16:46:42
 * @FilePath: /RougelikeGame2D/assets/module_rougelike/script/EnemyController.ts
 * @Description: 怪物控制器基类,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Vec2, _decorator, find } from "cc";
import { ActorState } from "../State";
import { BaseCharacter } from "../base/BaseCharacter";
const { ccclass, property, requireComponent } = _decorator;

@ccclass("EnemyController")
export abstract class EnemyController extends BaseCharacter {

    player: BaseCharacter = null;

    start(): void {
        super.start();
        this.player = find("Canvas/Player").getComponent(BaseCharacter)!;

        this.linearSpeed = 3;
        this.baseAttackRange = 0.1;
    }

    update(dt: number): void {
        super.update(dt);
        this.followPlayer();
    }

    followPlayer(): void {
        if (!this.player) return;

        const playerPos = this.player.node.position;
        const enemyPos = this.node.position;

        const direction = playerPos.subtract(enemyPos).normalize();
        if (direction.length() > this.baseAttackRange) {
            //设置速度 刚体的力
            const velocity = direction.multiplyScalar(this.linearSpeed);
            const vector = new Vec2(velocity.x, velocity.y);
            this.rigidBody.linearVelocity = vector;
        } else {
            this.changeState(ActorState.Idle);
            this.attackPlayer();
        }
    }

    protected abstract attackPlayer(): void;
}

