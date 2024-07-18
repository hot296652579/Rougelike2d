/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2024-07-17 19:39:05
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2024-07-18 09:44:05
 * @FilePath: /RougelikeGame2D/assets/module_rougelike/script/MapController.ts
 * @Description: 地图控制器,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE   
 */
import { BoxCollider2D, Component, EPhysics2DDrawFlags, ERigidBody2DType, Node, PhysicsSystem2D, RigidBody2D, TiledMap, _decorator, v2, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MapController')
export class MapController extends Component {

    tiledMap: TiledMap = null;
    @property(Node)
    bornPoint: Node = null;
    @property(Node)
    exitPoint: Node = null;

    start() {
        // 启用调试绘图
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb | EPhysics2DDrawFlags.Pair | EPhysics2DDrawFlags.CenterOfMass | EPhysics2DDrawFlags.Joint | EPhysics2DDrawFlags.Shape;

        this.tiledMap = this.node.getComponent(TiledMap);
        // const tileMapSize = this.tiledMap.getMapSize();

        const layer = this.tiledMap.getLayer('Obstacle');
        const tiledSize = layer.getMapTileSize();
        const layerSize = layer.getLayerSize();
        console.log("layerSize:", layerSize.width, layerSize.height);

        const windowSize = view.getVisibleSize();

        for (let i = 0; i < layerSize.width; i++) {
            for (let j = 0; j < layerSize.height; j++) {
                let tiled = layer.getTiledTileAt(i, j, true);
                if (tiled.grid != 0) {
                    let tiled = layer.getTiledTileAt(i, j);
                    let newNode = new Node();
                    newNode.setPosition(i * tiledSize.width, j * tiledSize.height);
                    newNode.addComponent(RigidBody2D).type = ERigidBody2DType.Static;
                    newNode.addComponent(BoxCollider2D);
                    let collider = newNode.getComponent(BoxCollider2D);
                    collider.size = tiledSize;
                    collider.offset = v2(tiledSize.width / 2, tiledSize.height / 2);
                    collider.apply();
                    this.node.addChild(newNode);
                    const world = tiled.node.getWorldPosition();
                    newNode.setWorldPosition(world.x - windowSize.width / 2, world.y - windowSize.height / 2, 0)
                }
            }
        }
    }
}
