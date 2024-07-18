/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2024-07-18 21:02:38
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2024-07-18 21:25:02
 * @FilePath: /RougelikeGame2D/assets/module_rougelike/script/enemy/EnemyController.ts
 * @Description: 怪物控制基类,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
        this.baseAttackRange = 100;
        this.baseAttack = 5;
    }

    update(dt: number): void {
        super.update(dt);
        this.followPlayer();
    }

    followPlayer(): void {
        if (!this.player || !this.rigidBody) return;

        const playerPos = this.player.node.position;
        const enemyPos = this.node.position;

        const direction = playerPos.subtract(enemyPos);
        const distance = direction.length();
        console.log(distance);

        if (distance > this.baseAttackRange) {
            //设置速度 刚体的力
            const normalizedDirection = direction.normalize();
            const velocity = new Vec2(normalizedDirection.x * this.linearSpeed, normalizedDirection.y * this.linearSpeed);
            this.rigidBody.linearVelocity = velocity;

            this.angle = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
            this.onDirection();
            this.changeState(ActorState.Walk);
        } else {
            this.changeState(ActorState.Idle);
            this.rigidBody.linearVelocity = Vec2.ZERO;
            this.attackPlayer();
        }
    }

    protected abstract attackPlayer(): void;
}
