import { given } from "@nivinjoseph/n-defensive";
import { Container } from "@nivinjoseph/n-ject";
import { PageRegistration } from "./page-registration";
import { ApplicationException } from "@nivinjoseph/n-exception";
import { Page } from "./page";
import { PageTreeBuilder } from "./page-tree-builder";
import { Resolver, Resolution } from "./resolve";
import { ComponentManager } from "./component-manager";
import { MetaDetail } from "./meta";


export class PageManager
{
    private readonly _vueRouter: any;
    private readonly _container: Container;
    private readonly _componentManager: ComponentManager;
    private readonly _pageViewModelClasses = new Array<Function>();
    private readonly _registrations = new Array<PageRegistration>();
    private readonly _resolvers = new Array<string>();
    private _vueRouterInstance: any = null;
    private _initialRoute: string = null;
    private _unknownRoute: string = null;
    private _defaultPageTitle: string = null;
    private _defaultPageMetas: ReadonlyArray<MetaDetail> = null;
    private _useHistoryMode: boolean = false;


    public get useHistoryMode(): boolean { return this._useHistoryMode; }
    public get vueRouterInstance(): any { return this._vueRouterInstance; }


    public constructor(vueRouter: any, container: Container, componentManager: ComponentManager)
    {
        given(vueRouter, "vueRouter").ensureHasValue();
        this._vueRouter = vueRouter;
        
        given(container, "container").ensureHasValue().ensureIsObject();
        this._container = container;
        
        given(componentManager, "componentManager").ensureHasValue().ensureIsObject();
        this._componentManager = componentManager;
    }


    public registerPages(...pageViewModelClasses: Function[]): void
    {
        this._pageViewModelClasses.push(...pageViewModelClasses);
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

    // /**
    //  * @deprecated
    //  */
    // public useAsDefaultPageTitle(title: string): void
    // {
    //     given(title, "title").ensureHasValue().ensureIsString();
    //     this._defaultPageTitle = title.trim();
    // }

    // /**
    //  * @deprecated
    //  */
    // public useAsDefaultPageMetadata(metas: ReadonlyArray<{ name: string; content: string; }>): void
    // {
    //     given(metas, "metas").ensureHasValue().ensureIsArray().ensure(t => t.length > 0);
    //     this._defaultPageMetas = [...metas];
    // }

    public useHistoryModeRouting(): void
    {
        this._useHistoryMode = true;
    }

    public bootstrap(): void
    {
        this._pageViewModelClasses.forEach(t => this.registerPage(t));
        if (this._registrations.length === 0)
            return;

        this.createRouting();
        this.configureResolves();
        // this.configureInitialRoute();
    }
    

    private registerPage(pageViewModelClass: Function): void
    {
        const registration = new PageRegistration(pageViewModelClass, this._defaultPageTitle, this._defaultPageMetas);

        if (this._registrations.some(t => t.name === registration.name))
            throw new ApplicationException(`Duplicate Page registration with name '${registration.name}'.`);

        if (this._registrations.some(t => t.route.routeKey === registration.route.routeKey))
            throw new ApplicationException(`Route conflict detected for Page registration with name '${registration.name}'`);

        this._registrations.push(registration);
        
        if (registration.persist)
            this._container.registerSingleton(registration.name, registration.viewModel);
        else
            this._container.registerTransient(registration.name, registration.viewModel);
        
        if (registration.resolvers && registration.resolvers.isNotEmpty)
            registration.resolvers.forEach(t =>
            {
                if (this._resolvers.contains(t.name))
                    return;

                this._container.registerTransient(t.name, t.value);
                this._resolvers.push(t.name);
            });
        
        if (registration.components && registration.components.isNotEmpty)
            this._componentManager.registerComponents(...registration.components);
        
        if (registration.pages && registration.pages.isNotEmpty)
            registration.pages.forEach(t => this.registerPage(t));
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

    private configureResolves(): void
    {
        this._vueRouterInstance.beforeEach((to: any, from: any, next: any) =>
        {
            const registrationName = to.name + "ViewModel";
            const registration = this._registrations.find(t => t.name === registrationName);
            registration.resolvedValues = null;
            if (registration.resolvers && registration.resolvers.length > 0)
            {
                const resolvers = registration.resolvers.map(t => this._container.resolve<Resolver>(t.name));
                resolvers
                    .mapAsync(async t =>
                    {
                        try 
                        {
                            const resolution = await t.resolve(from, to);
                            return resolution;
                        }
                        catch (error)
                        {
                            return false;
                        }
                    })
                    .then(resolutions =>
                    {
                        if (resolutions.some(t => t === false))
                        {
                            next(false);
                            return;
                        }
                        
                        const redirectRes = resolutions.find(t => !!(<Resolution>t).redirect) as Resolution;
                        if (redirectRes && redirectRes.redirect)
                        {
                            next(redirectRes.redirect);
                            return;
                        }
                        
                        registration.resolvedValues = resolutions.filter(t => (<any>t).value != null).map(t => (<any>t).value);
                        next();
                    })
                    .catch(() =>
                    {
                        next(false);
                    });
            }
            else
            {
                next();
            }
        });
    }

    // public handleInitialRoute(): void
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

