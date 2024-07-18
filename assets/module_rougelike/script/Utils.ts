import { ImageAsset, Node, Size, Sprite, SpriteFrame, Texture2D, UITransform } from "cc";
// 工具类
export class Utils {

    /**
     * @description: 创建一个纯色节点
     * @param {string} name
     * @return {*}
     */
    public static newSpriteNode(name: string = 'newSpriteNode'): Node {
        // 创建一个新的节点
        const colorNode = new Node('ColorNode');

        // 添加 UITransform 组件并设置尺寸
        const uiTransform = colorNode.addComponent(UITransform);
        uiTransform.setContentSize(new Size(100, 100)); // 设置节点尺寸为 100x100

        // 添加 Sprite 组件
        const sprite = colorNode.addComponent(Sprite);
        sprite.sizeMode = Sprite.SizeMode.CUSTOM; // 设置 Sprite 尺寸模式为自定义

        // 创建一个 1x1 像素的 ImageAsset 并设置颜色
        const imageAsset = new ImageAsset();
        imageAsset.reset({
            _data: new Uint8Array([255, 0, 0, 255]), // RGBA: 红色
            width: 1,
            height: 1,
            _compressed: false,
            format: Texture2D.PixelFormat.RGBA8888
        });

        // 创建一个 Texture2D 并使用 ImageAsset 初始化
        const texture = new Texture2D();
        texture.image = imageAsset;

        // 创建一个 SpriteFrame 并使用 Texture2D 初始化
        const spriteFrame = new SpriteFrame();
        spriteFrame.texture = texture;

        // 设置 Sprite 的 SpriteFrame
        sprite.spriteFrame = spriteFrame;

        return colorNode;
    }
}