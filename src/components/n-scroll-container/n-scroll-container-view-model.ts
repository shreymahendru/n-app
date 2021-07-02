import "simplebar/dist/simplebar.css";
import * as SimpleBar from "simplebar";
import { template } from "../../core/template";
import { element } from "../../core/element";
import { bind } from "../../core/bind";
import { ComponentViewModel } from "../../core/component-view-model";
import "./n-scroll-container-view.scss";
import { TypeHelper } from "@nivinjoseph/n-util";
import { given } from "@nivinjoseph/n-defensive";


@template(require("./n-scroll-container-view.html"))
@element("n-scroll-container")
@bind("onlyX", "onlyY", "renderKey")
export class NScrollContainerViewModel extends ComponentViewModel
{
    private _sb: SimpleBar | null = null;
    
    
    public get isHorizontalOnly(): boolean { return !!TypeHelper.parseBoolean(this.getBound("onlyX")); }
    public get isVerticalOnly(): boolean { return !!TypeHelper.parseBoolean(this.getBound("onlyY")); }
    public get myRenderKey(): any { return this.getBound("renderKey"); }
    
    
    protected override onCreate(): void
    {
        given(this, "this").ensure(t => !(t.isHorizontalOnly === true && t.isVerticalOnly === true),
            "only-x and only-y cannot both be true");
        
        super.onCreate();
    }
    
    protected override onMount(element: HTMLElement): void
    {
        super.onMount(element);
        
        const SimpleBarCtor = (<any>SimpleBar).default;
        this._sb = new SimpleBarCtor(element.querySelector(".simple-scroll-viewer-scroll-container")!, { autoHide: true });
        
        this.watch("myRenderKey", (v, ov) =>
        {
            if (v == null || v === ov)
                return;
            
            this._sb.recalculate();
        });
    }
    
    protected override onDestroy(): void
    {
        if (this._sb != null)
        {
            // this._sb.unMount();
            this._sb = null;
        }
        
        this.unWatch("myRenderKey");
        
        super.onDestroy();
    }
}