import { given } from "@nivinjoseph/n-defensive";
import { Container } from "@nivinjoseph/n-ject";
import { PageRegistration } from "./page-registration";
import { ApplicationException } from "@nivinjoseph/n-exception";
import { Page } from "./page";
import { PageTreeBuilder } from "./page-tree-builder";
import { Authorizer } from "./authorizer";


export class PageManager
{
    private readonly _vueRouter: any;
    private readonly _container: Container;
    private readonly _pageViewModelClasses = new Array<Function>();
    private readonly _authorizerClasses = new Array<Function>();
    private readonly _authorizers = new Array<string>();
    private readonly _registrations = new Array<PageRegistration>();
    private _vueRouterInstance: any = null;
    private _initialRoute: string = null;
    private _unknownRoute: string = null;
    private _defaultPageTitle: string = null;
    private _defaultPageMetas: Array<{ name: string; content: string; }> = null;
    private _useHistoryMode: boolean = false;
    private _defaultAuthorizerClass: Function = null;
    private _defaultAuthorizer: string = null;
    private _authorizeFailRoute: string = null;
    
    
    public get useHistoryMode(): boolean { return this._useHistoryMode; }
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
        this._pageViewModelClasses.push(...pageViewModelClasses);
    }
    
    public registerAuthorizers(...authorizerClasses: Function[]): void
    {
        this._authorizerClasses.push(...authorizerClasses);
    }
    
    public useAsDefaultAuthorizer(authorizerClass: Function): void
    {
        given(authorizerClass, "authorizerClass").ensureHasValue().ensureIsFunction();
        this._defaultAuthorizerClass = authorizerClass;
    }
    
    public useAsAuthorizeFailRoute(route: string): void
    {
        given(route, "route").ensureHasValue().ensureIsString();
        this._authorizeFailRoute = route.trim();
    }
    
    public useAsInitialRoute(route: string): void
    {
        given(route, "route").ensureHasValue().ensureIsString();
        this._initialRoute = route.trim();
    }
    
    public useAsUnknownRoute(route: string): void
    {
        given(route, "route").ensureHasValue().ensureIsString();
        this._unknownRoute = route.trim();
    }
    
    public useAsDefaultPageTitle(title: string): void
    {
        given(title, "title").ensureHasValue().ensureIsString();
        this._defaultPageTitle = title.trim();
    }
    
    public useAsDefaultPageMetadata(metas: ReadonlyArray<{ name: string; content: string; }>): void
    {
        given(metas, "metas").ensureHasValue().ensureIsArray().ensure(t => t.length > 0);
        this._defaultPageMetas = [...metas];
    }
    
    public useHistoryModeRouting(): void
    {
        this._useHistoryMode = true;
    }
    
    public bootstrap(): void
    {
        if (this._defaultAuthorizerClass)
        {
            this.registerAuthorizer(this._defaultAuthorizerClass);
            this._defaultAuthorizer = (" " + (<Object>this._defaultAuthorizerClass).getTypeName().trim()).substr(1); // Shrey: Safari de-optimization
        }
        this._authorizerClasses.forEach(t => this.registerAuthorizer(t));
        
        this._pageViewModelClasses.forEach(t => this.registerPage(t));  
        if (this._registrations.length === 0)
            return;
        
        this.createRouting();
        this.configureAuthorization();
    }
    
    
    private registerAuthorizer(authorizerClass: Function): void
    {
        const name = (" " + (<Object>authorizerClass).getTypeName().trim()).substr(1); // Shrey: Safari de-optimization
        if (this._authorizers.some(t => t === name))
            throw new ApplicationException(`Duplicate Authorizer registration with name '${name}'.`);
        
        this._container.registerTransient(name, authorizerClass);
        this._authorizers.push(name);
    }
    
    private registerPage(pageViewModelClass: Function): void
    {
        let registration = new PageRegistration(pageViewModelClass, this._defaultPageTitle, this._defaultPageMetas);

        if (this._registrations.some(t => t.name === registration.name))
            throw new ApplicationException(`Duplicate Page registration with name '${registration.name}'.`);

        if (this._registrations.some(t => t.route.routeKey === registration.route.routeKey))
            throw new ApplicationException(`Route conflict detected for Page registration with name '${registration.name}'`);

        if (registration.hasAuthorize)
        {
            if (registration.useDefaultAuthorizer)
            {
                if (!this._defaultAuthorizerClass)
                    throw new ApplicationException(`Page registration with name '${registration.name}' wants to use default Authorizer but no default Authorizer is configured for use.`);
            }
            else
            {
                registration.authorizers.forEach(t =>
                {
                    if (this._authorizers.some(u => u === t))
                        return;
                    
                    throw new ApplicationException(`Page registration with name '${registration.name}' wants to use Authorizer with name '${t}' but no such Authorizer is registered.`);
                });
            }
        }
        
        this._registrations.push(registration);
        this._container.registerTransient(registration.name, registration.viewModel);
    }
    
    private createRouting(): void
    {
        let pageTree = this.createPageTree();
        let vueRouterRoutes = pageTree.map(t => t.createVueRouterRoute());
        if (this._initialRoute)
            vueRouterRoutes.push({ path: "/", redirect: this._initialRoute });
        if (this._unknownRoute)
            vueRouterRoutes.push({ path: "*", redirect: this._unknownRoute });
        let vueRouter = this._vueRouter;
        const routerOptions: any = {
            routes: vueRouterRoutes,
            // @ts-ignore
            scrollBehavior: function (to: any, from: any, savedPosition: any)
            {
                return { x: 0, y: 0 };
            }
        };
        if (this._useHistoryMode)
            routerOptions.mode = "history";
        this._vueRouterInstance = new vueRouter(routerOptions);
    }
    
    
    private createPageTree(): ReadonlyArray<Page>
    {
        let root = new Page("/", null);
        let treeBuilder = new PageTreeBuilder(root, this._registrations);
        return treeBuilder.build();
    }
    
    private configureAuthorization(): void
    {
        // @ts-ignore
        this._vueRouterInstance.beforeEach((to: any, from: any, next: any) =>
        {
            const registrationName = to.name + "ViewModel";
            const registration = this._registrations.find(t => t.name === registrationName);
            if (registration.hasAuthorize)
            {
                const authorizers = registration.useDefaultAuthorizer
                    ? [this._container.resolve<Authorizer>(this._defaultAuthorizer)]
                    : registration.authorizers.map(t => this._container.resolve<Authorizer>(t));

                authorizers.forEach(t =>
                {
                    let passed = true;

                    try 
                    {
                        passed = t.authorize();
                    }
                    catch (error)
                    {
                        console.error(`${(<Object>t).getTypeName()} Error =>`, error);
                        passed = false;
                    }

                    if (!passed)
                    {
                        next(this._authorizeFailRoute || false);
                        return;
                    }
                });
            }

            next();
        });
    }
    
    // private configureInitialRoute(): void
    // {
    //     if (!this._initialRoute || this._initialRoute.isEmptyOrWhiteSpace())
    //         return;

    //     if (this._useHistoryMode)
    //     {
    //         if (!window.location.pathname || window.location.pathname.toString().isEmptyOrWhiteSpace() ||
    //             window.location.pathname.toString().trim() === "/" || window.location.pathname.toString().trim() === "null")
    //             this._vueRouterInstance.replace(this._initialRoute);
            
    //         return;
    //     }

    //     if (!window.location.hash)
    //     {
    //         if (this._initialRoute)
    //             window.location.hash = "#" + this._initialRoute;
    //     }
    //     else
    //     {
    //         let hashVal = window.location.hash.trim();
    //         if (hashVal.length === 1)
    //         {
    //             if (this._initialRoute)
    //                 window.location.hash = "#" + this._initialRoute;
    //         }
    //         else
    //         {
    //             hashVal = hashVal.substr(1);
    //             if (hashVal === "/")
    //             {
    //                 if (this._initialRoute)
    //                     window.location.hash = "#" + this._initialRoute;
    //             }
    //         }
    //     }
    // }
}

