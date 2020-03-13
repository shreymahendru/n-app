import { PageRegistration } from "./page-registration";
import { RouteArgs } from "./route-args";
export declare class PageHmrHelper {
    private static readonly _infos;
    private constructor();
    static track(registration: PageRegistration, routeArgs: RouteArgs): void;
    static restore(registration: PageRegistration): RouteArgs;
}
