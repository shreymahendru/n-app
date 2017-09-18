import { ComponentViewModel } from "./component-view-model";
import { RouteArgs } from "./route-args";


// public
export class PageViewModel extends ComponentViewModel
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
    
    
    protected onEnter(...params: any[]): void
    { }
    
    protected onLeave(): void
    { }
}