import { ViewModelRegistration } from "./view-model-registration";
import { RouteInfo } from "./route-info";
export declare class PageRegistration extends ViewModelRegistration {
    private readonly _route;
    private readonly _redirect;
    private readonly _title;
    private readonly _metadata;
    private readonly _resolvers;
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
}
