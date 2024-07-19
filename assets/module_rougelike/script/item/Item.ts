import { Collider2D, Component, RigidBody2D } from "cc";
import { PlayerController } from "../PlayerController";

//物品类型
export enum AttributeType {
    Attack,        //攻击力
    AttackSpeed,  //攻击速度
    AttackRange, //范围
    Defense,     // 防御类型
}

export interface IAttributeBonus {
    type: AttributeType;
    value: number;
}

export interface ItemData {
    name: string;
    attributeBonuses: IAttributeBonus[];
}

/**
 * @description: 物品基类
 * @return {*}
 */
export abstract class Item extends Component {

    rigidBody2D: RigidBody2D = null;
    collider2D: Collider2D = null;
    itemName: string;
    attributeBonuses: IAttributeBonus[];

    initialize(data: ItemData): void {
        this.itemName = data.name;
        this.attributeBonuses = data.attributeBonuses;
    }

    applyBonuse(player: PlayerController): void {
        for (let bonus of this.attributeBonuses) {
            player.applyBonus(bonus);
        }
    }

    removeBonuse(player: PlayerController): void {
        for (let bonus of this.attributeBonuses) {
            player.removeBonus(bonus);
        }
    }
}

