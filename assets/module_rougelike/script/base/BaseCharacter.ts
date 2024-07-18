import { Animation, Component, RigidBody2D, Vec2, Vec3, _decorator } from "cc";
import { ActorState } from "../State";
import { IAttributeBonus } from "../item/Item";
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

export interface ICharacter {
    baseAttack: number;
    baseAttackSpeed: number;
    baseAttackRange: number;
    baseDefense: number;

    currentAttack: number;
    currentAttackSpeed: number;
    currentAttackRange: number;
    currentDefense: number;

    moving(): void;
    attack(target: ICharacter): void;
    takeDamage(damage: number): void;
    applyBonus(bonus: IAttributeBonus): void;
    removeBonus(bonus: IAttributeBonus): void;
}

@ccclass("BaseCharacter")
export class BaseCharacter extends Component implements ICharacter {
    @property
    baseAttack: number = 0;
    @property
    baseAttackSpeed: number = 0;
    @property
    baseAttackRange: number = 0;
    @property
    baseDefense: number = 0;

    currentAttack: number = 0;
    currentAttackSpeed: number = 0;
    currentAttackRange: number = 0;
    currentDefense: number = 0;

    state: ActorState = ActorState.Idle;
    rigidBody: RigidBody2D | null = null;
    animation: Animation | null = null;
    linearSpeed: number = 10;
    inputVector: Vec2 = new Vec2();
    angle: number = 0;

    initialize(baseAttack: number, baseAttackSpeed: number, baseAttackRange: number, baseDefense: number) {
        this.baseAttack = baseAttack;
        this.baseAttackSpeed = baseAttackSpeed;
        this.baseAttackRange = baseAttackRange;
        this.baseDefense = baseDefense;

        this.currentAttack = baseAttack;
        this.currentAttackSpeed = baseAttackSpeed;
        this.currentAttackRange = baseAttackRange;
        this.currentDefense = baseDefense;
    }

    start(): void {
        this.animation = this.node.getComponent(Animation);
        this.rigidBody = this.node.getComponent(RigidBody2D);
    }

    update(dt: number): void {
        switch (this.state) {
            case ActorState.Walk:
                this.onDirection();
                this.moving();
                break;
            default:
                break;
        }
    }

    //移动逻辑
    moving(): void {
        if (this.inputVector.length() > 0) {
            const velocity = this.inputVector.normalize().multiplyScalar(this.linearSpeed);
            this.rigidBody.linearVelocity = velocity;
        }
    }

    //停止移动
    private stopMove(): void {
        this.rigidBody.linearVelocity = Vec2.ZERO;
    }

    attack(target: ICharacter): void { }

    takeDamage(damge: number): void { }

    applyBonus(bonus: IAttributeBonus): void { }

    removeBonus(bonus: IAttributeBonus): void { }

    //角度朝向
    protected onDirection(): void {
        if (this.inputVector.length() > 0) {
            if (this.angle < 0) {
                this.angle += 360;
            }

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


    //切换动画
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

    //改变状态
    changeState(state: ActorState) {
        if (this.state == ActorState.Die) return;

        if (this.state != ActorState.Walk) {
            this.stopMove();
        }
        this.state = state;
        this.playAnimationByState();
    }
}