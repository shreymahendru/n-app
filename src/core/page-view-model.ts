import { RouteArgs } from "./route-args";
import { BaseViewModel } from "./base-view-model";
import "@nivinjoseph/n-ext";
import { given } from "@nivinjoseph/n-defensive";
import { PageRegistration } from "./page-registration";
import { PageComponentFactory } from "./page-component-factory";


// public
export class PageViewModel extends BaseViewModel
{
    protected get currentRoute(): string
    {
        let route: string = this.ctx.$route ? this.ctx.$route.fullPath : null;
        route = route ? route.trim() : null;
        if (route)
        {
            while (route.endsWith("/") || route.endsWith("?"))
                route = route.substr(0, route.length - 1).trimRight();
        }
        return route;   
    }
    
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
    protected onEnter(...params: any[]): void
    { 
        given(params, "params").ensureHasValue().ensureIsArray();
    }
    
    // override
    protected onLeave(): void
    { }
    
    public static createComponentOptions(component: Function, defaultPageTitle: string, defaultPageMetadata: ReadonlyArray<{ name: string; content: string; }>): object
    {
        given(component, "component").ensureHasValue().ensureIsFunction();
        given(defaultPageTitle, "defaultPageTitle").ensureIsString();
        given(defaultPageMetadata, "defaultPageMetadata").ensureIsArray();

        const registration = new PageRegistration(component, defaultPageTitle, defaultPageMetadata);
        const factory = new PageComponentFactory();
        return factory.create(registration);
    }
}