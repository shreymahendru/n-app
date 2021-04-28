import { DisplayService } from "./display-service";
import { DisplayType } from "./display-type";
export declare class DefaultDisplayService implements DisplayService {
    private _currentDisplayType;
    private _currentDisplayWidth;
    private _currentDisplayHeight;
    get CurrentDisplayType(): DisplayType;
    get CurrentDisplayWidth(): number;
    get CurrentDisplayHeight(): number;
    constructor();
    private CalculateCurrentDisplayType;
}
