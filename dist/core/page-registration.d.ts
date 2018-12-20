import { ViewModelRegistration } from "./view-model-registration";
import { RouteInfo } from "./route-info";
export declare class PageRegistration extends ViewModelRegistration {
    private readonly _route;
    private readonly _redirect;
    private readonly _title;
    private readonly _metadata;
    private readonly _hasAuthorize;
    private readonly _useDefaultAuthorizer;
    private readonly _authorizers;
    readonly route: RouteInfo;
    readonly redirect: string;
    readonly title: string;
    readonly metadata: object;
    readonly hasAuthorize: boolean;
    readonly useDefaultAuthorizer: boolean;
    readonly authorizers: ReadonlyArray<string>;
    constructor(page: Function, defaultPageTitle: string, defaultPageMetas: Array<{
        name: string;
        content: string;
    }>);
}
