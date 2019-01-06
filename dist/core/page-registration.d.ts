import { ViewModelRegistration } from "./view-model-registration";
import { RouteInfo } from "./route-info";
export declare class PageRegistration extends ViewModelRegistration {
    private readonly _route;
    private readonly _redirect;
    private readonly _title;
    private readonly _metadata;
    private readonly _resolvers;
    private _resolvedValues;
    readonly route: RouteInfo;
    readonly redirect: string;
    readonly title: string;
    readonly metadata: object;
    readonly resolvers: ReadonlyArray<any>;
    resolvedValues: ReadonlyArray<any>;
    constructor(page: Function, defaultPageTitle: string, defaultPageMetas: Array<{
        name: string;
        content: string;
    }>);
}
