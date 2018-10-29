import { DisplayService } from "./display-service";
import { DisplayType } from "./display-type";
import * as $ from "jquery";


export class DefaultDisplayService implements DisplayService
{
    private _currentDisplayType: DisplayType = null;
    private _currentDisplayWidth: number = null;
    private _currentDisplayHeight: number = null;


    public get CurrentDisplayType(): DisplayType { return this._currentDisplayType; }
    public get CurrentDisplayWidth(): number { return this._currentDisplayWidth; }
    public get CurrentDisplayHeight(): number { return this._currentDisplayHeight; }


    constructor()
    {
        this.CalculateCurrentDisplayType();
        $(window).resize(() =>
        {
            this.CalculateCurrentDisplayType();
        });
    }


    private CalculateCurrentDisplayType(): void
    {
        const displayHeight = $(window).height();
        if (this._currentDisplayHeight !== displayHeight)
            this._currentDisplayHeight = displayHeight;   
        
        const displayWidth = $(window).width();
        if (displayWidth === this._currentDisplayWidth)
            return;
        this._currentDisplayWidth = displayWidth;

        let displayType = DisplayType.Desktop;
        if (displayWidth < 1024) displayType = DisplayType.Tablet;
        if (displayWidth < 769) displayType = DisplayType.Phone;
        this._currentDisplayType = displayType;
    }
}