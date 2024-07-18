import { AssetManager, Button, assetManager, director } from "cc";
import { tgxUIController, tgxUIMgr, tgxUIWaiting } from "../../core_tgx/tgx";
import { GameUILayers } from "../../scripts/GameUILayers";
import { ModuleDef } from "../../scripts/ModuleDef";
import { UI_HUD } from "../ui_hud/UI_HUD";
import { Layout_DemoList } from "./Layout_DemoList";

const DemoList = [
    { bundle: ModuleDef.DEMO_TANK, entryScene: 'tank_game' },
    // { bundle: ModuleDef.DEMO_ROOSTER, entryScene: 'rooster_jump' },
    { bundle: ModuleDef.ROUGELIKE, entryScene: 'rougelike_ganme' },
];

export class UI_DemoList extends tgxUIController {
    constructor() {
        super('ui_demo_list/UI_DemoList', GameUILayers.POPUP, Layout_DemoList);
    }

    public getRes(): [] {
        return [];
    }

    protected onCreated(): void {
        let layout = this.layout as Layout_DemoList;
        layout.btnClose.node.active = false;
        this.onButtonEvent(layout.btnClose, () => {
            this.hide();
        });

        for (let i = 0; i < layout.contentRoot.children.length; ++i) {
            let item = layout.contentRoot.children[i];
            let btn = item.getComponent(Button);
            this.onButtonEvent(btn, (currentTarget, info: { bundle: string, entryScene: string }) => {
                if (!info) {
                    return;
                }
                tgxUIWaiting.show();
                assetManager.loadBundle(info.bundle, (err, bundle: AssetManager.Bundle) => {
                    if (bundle) {
                        director.loadScene(info.entryScene, () => {
                            tgxUIMgr.inst.hideAll();
                            tgxUIMgr.inst.showUI(UI_HUD);
                        });
                    }
                });
            }, this, DemoList[i]);
        }
    }

    showCloseBtn() {
        let layout = this.layout as Layout_DemoList;
        layout.btnClose.node.active = true;
    }
}