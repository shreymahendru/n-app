import { RouteInfo } from "./route-info";
import "@nivinjoseph/n-ext";
export declare class RouteArgs {
    private readonly _pathArgs;
    private readonly _queryArgs;
    private readonly _routeArgs;
    get pathArgs(): object;
    get queryArgs(): object;
    get routeArgs(): Array<any>;
    constructor(pathArgs: object, queryArgs: object, routeArgs: Array<any>);
    equals(comparison: RouteArgs): boolean;
    static create(route: RouteInfo, ctx: any): RouteArgs;
    private createParamsArray;
}
