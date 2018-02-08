import { given } from "n-defensive";
import { Container } from "n-ject";
import { PageRegistration } from "./page-registration";
import { ApplicationException } from "n-exception";
import { Page } from "./page";
import { PageTreeBuilder } from "./page-tree-builder";


export class PageManager
{
    private readonly _vueRouter: any;
    private readonly _container: Container;
    private readonly _registrations = new Array<PageRegistration>();
    private _vueRouterInstance: any;
    private _unknownRoute: string;
    private _useHistoryMode: boolean = false;
    
    
    public get vueRouterInstance(): any { return this._vueRouterInstance; }
    
    
    public constructor(vueRouter: any, container: Container)
    {
        given(vueRouter, "vueRouter").ensureHasValue();
        given(container, "container").ensureHasValue();
        this._vueRouter = vueRouter;
        this._container = container;
    }
    
    
    public registerPages(...pageViewModelClasses: Function[]): void
    {
        for (let item of pageViewModelClasses)
            this.registerPage(item);    
    }
    
    public useAsUnknownRoute(route: string): void
    {
        given(route, "route").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        this._unknownRoute = route.trim();
    }
    
    public useHistoryModeRouting(): void
    {
        this._useHistoryMode = true;
    }
    
    public bootstrap(): void
    {
        if (this._registrations.length === 0)
            return;
        
        let pageTree = this.createPageTree();
        let vueRouterRoutes = pageTree.map(t => t.createVueRouterRoute(this._container));  
        if (this._unknownRoute)
            vueRouterRoutes.push({ path: "*", redirect: this._unknownRoute });    
        let vueRouter = this._vueRouter;
        const routerOptions: any = {
            routes: vueRouterRoutes,
            scrollBehavior: function (to: any, from: any, savedPosition: any)
            {
                return { x: 0, y: 0 };
            }
        };
        if (this._useHistoryMode)
            routerOptions.mode = "history";    
        this._vueRouterInstance = new vueRouter(routerOptions);
    }
    
    
    private registerPage(pageViewModelClass: Function): void
    {
        let registration = new PageRegistration(pageViewModelClass);

        if (this._registrations.some(t => t.name === registration.name))
            throw new ApplicationException(`Duplicate Page registration with name '${registration.name}'.`);

        if (this._registrations.some(t => t.route.routeKey === registration.route.routeKey))
            throw new ApplicationException(`Route conflict detected for Page registration with name '${registration.name}'`);

        this._registrations.push(registration);
        this._container.registerTransient(registration.name, registration.viewModel);
    }
    
    private createPageTree(): ReadonlyArray<Page>
    {
        let root = new Page("/", null);
        let treeBuilder = new PageTreeBuilder(root, this._registrations);
        return treeBuilder.build();
    }
}

