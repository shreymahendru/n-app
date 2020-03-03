import { ViewModelRegistration } from "./view-model-registration";
import { RouteInfo } from "./route-info";
export declare class PageRegistration extends ViewModelRegistration {
    private _route;
    private _redirect;
    private _title;
    private _metadata;
    private _resolvers;
    private _resolvedValues;
    get route(): RouteInfo;
    get redirect(): string;
    get title(): string;
    get metadata(): object;
    get resolvers(): ReadonlyArray<any>;
    get resolvedValues(): ReadonlyArray<any>;
    set resolvedValues(value: ReadonlyArray<any>);
    constructor(page: Function, defaultPageTitle: string, defaultPageMetas: ReadonlyArray<{
        name: string;
        content: string;
    }>);
    reload(page: Function): void;
}
