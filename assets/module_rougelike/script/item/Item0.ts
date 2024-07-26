/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2024-07-19 16:01:53
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2024-07-19 22:40:06
 * @FilePath: /RougelikeGame2D/assets/module_rougelike/script/item/Item0.ts
 * @Description: 物品1,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Collider2D, Contact2DType, IPhysics2DContact, RigidBody2D, _decorator } from 'cc';
import { groupNames } from '../PhysicsGroup';
import { PlayerController } from '../PlayerController';
import { AttributeType, Item } from './Item';
const { ccclass, property } = _decorator;

@ccclass('Item0')
export class Item0 extends Item {
    private shouldDestroy: boolean = false;

    start() {
        this.initialize({ name: "Weapon1", attributeBonuses: [{ type: AttributeType.Attack, value: 10 }] });

        this.rigidBody2D = this.getComponent(RigidBody2D)!;
        this.collider2D = this.getComponent(Collider2D)!;
        this.collider2D.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        // this.collider2D.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
    }

    update(deltaTime: number) {
        if (this.shouldDestroy) {
            this.shouldDestroy = false;
            //下一帧 延迟删除
            this.scheduleOnce(() => {
                this.node.destroy();
            }, 0.1);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // console.log('物品碰撞检测 other group:', otherCollider.group);
        const otherGroupName = groupNames[otherCollider.group] || 'Unknown';

        if (otherGroupName == groupNames[2]) {
            const player = otherCollider.getComponent(PlayerController);
            if (player) {
                contact.disabledOnce = true;
                player.equipItem(this);
                this.shouldDestroy = true;
            }
        }
    }
}

