import { _decorator, Collider2D, Component, Contact2DType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ExitPoint')
export class ExitPoint extends Component {
    private collider2D!: Collider2D;
    start() {

        this.collider2D = this.getComponent(Collider2D)!;
        this.collider2D.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D): void {
        console.log('otherCollider.node.name:', otherCollider.node.name);
    }
}

