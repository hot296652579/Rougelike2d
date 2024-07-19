/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2024-07-19 14:25:08
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2024-07-19 16:13:16
 * @FilePath: /RougelikeGame2D/assets/module_rougelike/script/enemy/PhysicsGroup.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 物理分组
 */
export enum PhysicsGroup {
    /**
     * 默认的物理组。当未明确为游戏对象分配物理组时，游戏对象将自动分配至此组。
     */
    DEFAULT = 1 << 0,
    /**
     * 对于玩家角色的碰撞组，可以很方便地与其他物理组进行交互。
     */
    PLAYER = 1 << 1,
    /**
     * 敌人角色的碰撞组。可用于区分敌人与玩家之间的碰撞关系。
     */
    ENEMY = 1 << 2,
    /**
     * 子弹的碰撞组。可用于区分武器子弹与敌人之间的碰撞关系。
     */
    BULLET = 1 << 3,
    /**
     * 常用于表示墙壁、地面等不可穿透的障碍物的组。
     */
    WALL = 1 << 4,
    /**
     * 一般用于表示物品。
     */
    ITEM = 1 << 5,
}

export const groupNames: { [key: number]: string } = {
    1: 'DEFAULT',
    2: 'PLAYER',
    3: 'BULLET',
    4: 'ENEMY',
    5: 'ITEM',
}