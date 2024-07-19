/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2024-07-17 11:03:04
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2024-07-19 16:25:17
 * @FilePath: /RougelikeGame2D/assets/module_rougelike/script/PlayerController.ts
 * @Description: 玩家控制器,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Collider2D, Contact2DType, IPhysics2DContact, _decorator } from "cc";
import { JoyStickMgr } from "./JoyStickMgr";
import { groupNames } from "./PhysicsGroup";
import { ActorState } from "./State";
import { BaseCharacter } from "./base/BaseCharacter";
import { Item } from "./item/Item";
const { ccclass, property, requireComponent } = _decorator;

@ccclass("PlayerController")
export class PlayerController extends BaseCharacter {
    joystick: JoyStickMgr = null;
    collider2D: Collider2D = null;

    start(): void {
        super.start();
        this.joystick = this.node.parent.getComponentInChildren(JoyStickMgr);
        this.collider2D = this.getComponent(Collider2D)!;
        this.collider2D.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        // this.collider2D.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);

        this.initialize(this.baseAttack, this.baseAttackSpeed, this.baseAttackRange, this.baseDefense);
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

    takeDamage(damge: number): void {
        super.takeDamage(damge);
        this.changeState(ActorState.Hit);

        //DOTO 血量减少
        // console.log("玩家受到伤害");
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        const otherGroupName = groupNames[otherCollider.group] || 'Unknown'
        if (otherGroupName == groupNames[4]) {
            this.changeState(ActorState.Attack);
            const enemy = otherCollider.node.getComponent(BaseCharacter)!;
            enemy.takeDamage(this.baseAttack);
        }
    }

    playAnimationByState(): void {
        super.playAnimationByState();
        switch (this.state) {
            case ActorState.Idle:
                this.animation.crossFade('player_left_idle', 0.3);
                break;
            case ActorState.Hit:
                this.animation.crossFade('player_left_hit', 0.3);
                break;
            case ActorState.Walk:
                this.animation.crossFade('player_left_walk', 0.3);
                break;
            case ActorState.Attack:
                this.animation.crossFade('player_left_attack', 0.3);
                break;
        }
    }

    attackFinish(): void {
        this.changeState(ActorState.Idle);
    }

    /**
     * @description: 穿戴物品
     * @param {Item} item
     * @return {*}
     */
    equipItem(item: Item): void {
        console.log('equipItem:', item);
        this.equippedItems.push(item);
        item.applyBonuse(this);
    }

    unequipItem(item: Item): void {
        this.equippedItems = this.equippedItems.filter((i) => i != item);
        item.removeBonuse(this);
    }
}

