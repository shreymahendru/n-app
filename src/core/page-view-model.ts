import { RouteArgs } from "./route-args";
import { BaseViewModel } from "./base-view-model";


// public
export class PageViewModel extends BaseViewModel
{
    protected get pathArgs(): Object
    {
        let routeArgs: RouteArgs = (<any>this).__routeArgs;
        return routeArgs ? routeArgs.pathArgs : null;
    }
    
    protected get queryArgs(): Object
    { 
        let routeArgs: RouteArgs = (<any>this).__routeArgs;
        return routeArgs ? routeArgs.queryArgs : null;
    }
    
    // override
    // @ts-ignore
    protected onEnter(...params: any[]): void
    { }
    
    // override
    protected onLeave(): void
    { }
}