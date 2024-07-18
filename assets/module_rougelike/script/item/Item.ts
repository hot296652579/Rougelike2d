import { PlayerController } from "../PlayerController";

//物品类型
enum AttibuteType {
    Attack,        //攻击力
    AttackSpeed,  //攻击速度
    AttackRange, //范围
    Defense,     // 防御类型
}


//物品接口
export interface IAttributeBonus {
    type: AttibuteType;
    value: number;
}


//物品基类
export abstract class Item {
    name: string;
    attributeBonuses: IAttributeBonus[];

    constructor(name: string, attributes: IAttributeBonus[]) {
        this.name = name;
        this.attributeBonuses = attributes;
    }

    applyBonus(player: PlayerController): void {
        for (let bonus of this.attributeBonuses) {
            //DOTO 添加玩家穿戴方法
            // player.applyBonus(bonus);
        }
    }
}

