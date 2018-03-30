import { ViewModelRegistration } from "./view-model-registration";
import { RouteInfo } from "./route-info";
export declare class PageRegistration extends ViewModelRegistration {
    private readonly _route;
    private readonly _redirect;
    readonly route: RouteInfo;
    readonly redirect: string;
    constructor(page: Function);
}
