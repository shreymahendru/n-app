import { RouteInfo } from "./route-info";
import "n-ext";
export declare class RouteArgs {
    private readonly _pathArgs;
    private readonly _queryArgs;
    private readonly _routeArgs;
    readonly pathArgs: object;
    readonly queryArgs: object;
    readonly routeArgs: Array<any>;
    constructor(pathArgs: object, queryArgs: object, routeArgs: Array<any>);
    equals(comparison: RouteArgs): boolean;
    static create(route: RouteInfo, ctx: any): RouteArgs;
    private createParamsArray(routeArgs);
}
