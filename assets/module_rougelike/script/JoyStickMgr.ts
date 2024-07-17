import { _decorator, Component, EventTouch, Input, Node, Size, UITransform, Vec2, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass('JoyStickMgr')
export class JoyStickMgr extends Component {
    @property(Node)
    body: Node = null;

    @property(Node)
    stick: Node = null;

    bodySize: Size = null;
    defaultPosition: Vec3 = null;
    inputVec: Vec2 = Vec2.ZERO;
    angle: number = 0;

    start() {
        this.defaultPosition = this.body.getWorldPosition();
        this.bodySize = this.body.getComponent(UITransform).contentSize;

        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    private onTouchStart(event: EventTouch) {
        const touchPos = event.getUILocation();
        const uiTransform = this.body.parent.getComponent(UITransform);
        const localPosition = uiTransform.convertToNodeSpaceAR(new Vec3(touchPos.x, touchPos.y, 0));
        this.body.setPosition(localPosition);
    }

    private onTouchMove(event: EventTouch) {
        const touchPos = event.getUILocation();
        const uiTransform = this.body.parent.getComponent(UITransform);
        const localPosition = uiTransform.convertToNodeSpaceAR(new Vec3(touchPos.x, touchPos.y, 0));

        const offset = new Vec2(localPosition.x - this.body.position.x, localPosition.y - this.body.position.y);
        const radius = this.bodySize.width / 2;

        if (offset.length() > radius) {
            offset.normalize().multiplyScalar(radius);
        }

        this.stick.setPosition(new Vec3(offset.x, offset.y, 0));
        this.inputVec = offset.clone().normalize();
        // console.log(this.inputVec);
    }

    private onTouchEnd(event: EventTouch) {
        this.body.setWorldPosition(this.defaultPosition);
        this.stick.setPosition(Vec3.ZERO);
        this.inputVec = Vec2.ZERO;
    }

    update(deltaTime: number) {
        if (this.inputVec.length() > 0) {
            const angle = this.vector_to_angle(this.inputVec);
            this.angle = angle;
        }
    }

    /**
     * @description: 向量转弧度
     * @param {Vec2} vector:Vec2
     * @return {*}
     */
    private vector_to_angle(vector: Vec2): number {
        // 将传入的向量归一化
        let dir = vector.normalize();
        // 计算出目标角度的弧度
        let radian = dir.signAngle(new Vec2(1, 0));
        // 把弧度计算成角度
        let angle = -this.radian_to_angle(radian);
        // 返回角度
        return (angle);
    }

    /**
     * @description: 弧度转角度
     * @param {number} radian
     * @return {*}
     */
    private radian_to_angle(radian: number): number {
        // 弧度转角度公式
        // 180 / π * 弧度

        // 计算出角度
        let angle = 180 / Math.PI * radian;
        // 返回弧度
        return (angle);
    }
}
