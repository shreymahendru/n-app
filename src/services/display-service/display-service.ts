import { Observable } from "@nivinjoseph/n-util";
import { DisplayType } from "./display-type";


export interface DisplayService
{
    get currentDisplayType(): DisplayType;
    get currentDisplayWidth(): number;
    get currentDisplayHeight(): number;
    
    get windowResizeObservable(): Observable<void>;
}