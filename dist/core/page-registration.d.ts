import { ViewModelRegistration } from "./view-model-registration";
import { RouteInfo } from "./route-info";
export declare class PageRegistration extends ViewModelRegistration {
    private readonly _route;
    private readonly _redirect;
    private readonly _title;
    readonly route: RouteInfo;
    readonly redirect: string;
    readonly title: string;
    constructor(page: Function, defaultPageTitle: string);
}
