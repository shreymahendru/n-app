import { ViewModelRegistration } from "./view-model-registration";
import { RouteInfo } from "./route-info";
import { MetaDetail } from "./meta";
export declare class PageRegistration extends ViewModelRegistration {
    private readonly _route;
    private readonly _redirect;
    private readonly _title;
    private readonly _metadata;
    private readonly _resolvers;
    private readonly _pages;
    private _resolvedValues;
    get route(): RouteInfo;
    get redirect(): string;
    get title(): string;
    get metadata(): ReadonlyArray<MetaDetail>;
    get resolvers(): ReadonlyArray<any>;
    get pages(): ReadonlyArray<Function>;
    get resolvedValues(): ReadonlyArray<any>;
    set resolvedValues(value: ReadonlyArray<any>);
    constructor(page: Function, defaultPageTitle: string, defaultPageMetas: ReadonlyArray<MetaDetail>);
}
