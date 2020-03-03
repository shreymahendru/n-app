import { given } from "@nivinjoseph/n-defensive";
import { PageRegistration } from "./page-registration";
// import { PageComponentFactory } from "./page-component-factory";


export class Page
{
    private readonly _segment: string;
    private _parent: Page;
    private readonly _children = new Array<Page>();
    private _registration: PageRegistration;


    public get segment(): string { return this._segment; }
    public get parent(): Page { return this._parent; }
    public get children(): ReadonlyArray<Page> { return this._children.map(t => t); }
    public get registration(): PageRegistration { return this._registration; }


    public constructor(segment: string, parent: Page)
    {
        given(segment, "segment").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        this._segment = segment;
        if (parent)
            this.changeParent(parent);
    }


    public attachRegistration(registration: PageRegistration)
    {
        given(registration, "registration").ensureHasValue();
        this._registration = registration;
    }

    public addChild(childPage: Page): void
    {
        given(childPage, "childPage").ensureHasValue();
        this._children.push(childPage);
    }

    public removeChild(childPage: Page): void
    {
        given(childPage, "childPage").ensureHasValue()
            .ensure(t => this._children.some(u => u === t), "child not present");

        this._children.remove(childPage);
    }

    public changeParent(parent: Page): void
    {
        if (this._parent) this._parent.removeChild(this);
        this._parent = parent;
        if (this._parent) this._parent.addChild(this);
    }
    
    public createVueRouterRoute(): any
    {
        // let factory = new PageComponentFactory(container);
        // let factory = new PageComponentFactory();
        
        let vueRouterRoute: any = {
            name: this._registration.name.replace("ViewModel", ""),
            path: this.createRoute(),
            // component: factory.create(this._registration)
            component: (<any>this._registration.viewModel).___componentOptions
        };
        
        if (this._registration.redirect)
        {
            vueRouterRoute.redirect = (to: any) =>
            {
                // we can do this because redirect has to be a nested route
                return to.path + this._registration.redirect.replace(this._registration.route.route, "");
            };
        }
        
        if (this._children.length > 0)
            vueRouterRoute.children = this._children.map(t => t.createVueRouterRoute());
        
        return vueRouterRoute;
    }
    
    
    private createRoute(): string
    {
        let route = this._registration.route.vueRoute;
        if (!this._parent)
            return route;
        
        route = route.replace(this._parent.registration.route.vueRoute, "");
        if (route.startsWith("/"))
            route = route.substr(1);
        
        return route;
    }
}