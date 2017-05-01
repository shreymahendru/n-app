import { ViewModelRegistration } from "./view-model-registration";
import { RouteInfo } from "./route-info";
export declare class PageRegistration extends ViewModelRegistration {
    private readonly _route;
    readonly route: RouteInfo;
    constructor(page: Function);
}
