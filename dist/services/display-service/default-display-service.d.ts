import { DisplayService } from "./display-service";
import { DisplayType } from "./display-type";
export declare class DefaultDisplayService implements DisplayService {
    private _currentDisplayType;
    private _currentDisplayWidth;
    private _currentDisplayHeight;
    readonly CurrentDisplayType: DisplayType;
    readonly CurrentDisplayWidth: number;
    readonly CurrentDisplayHeight: number;
    constructor();
    private CalculateCurrentDisplayType;
}
