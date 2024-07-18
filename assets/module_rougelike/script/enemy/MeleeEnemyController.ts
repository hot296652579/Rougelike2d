/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2024-07-18 16:40:27
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2024-07-18 16:45:24
 * @FilePath: /RougelikeGame2D/assets/module_rougelike/script/enemy/MeleeEnemyController.ts
 * @Description: 近战怪物,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { _decorator } from "cc";
import { EnemyController } from "./EnemyController";
const { ccclass, property } = _decorator;

@ccclass("MeleeEnemyController")
export class MeleeEnemyController extends EnemyController {

    protected attackPlayer(): void {
        //DOTO 近战逻辑
        console.log("近战怪物攻击玩家");
    }
}