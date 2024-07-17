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
        // Optional: Implement any additional logic needed
    }
}
