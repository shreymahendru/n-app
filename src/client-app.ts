const Vue = require("./../vendor/vue.js");
const VueRouter = require("./../vendor/vue-router.js");
Vue.use(VueRouter);

import { given } from "n-defensive";
import "n-ext";
import { Container, ComponentInstaller } from "n-ject";
import { ComponentManager } from "./component-manager";
import { PageManager } from "./page-manager";


// public
export class ClientApp
{
    private readonly _appElementId: string;
    private readonly _container: Container;
    private readonly _componentManager: ComponentManager;
    private readonly _pageManager: PageManager;
    private _initialRoute: string;
    private _app: any;
    
    
    public constructor(appElementId: string)
    {
        given(appElementId, "appElementId").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace()).ensure(t => t.startsWith("#"));
        this._appElementId = appElementId;
        this._container = new Container();
        this._componentManager = new ComponentManager(Vue, this._container);
        this._pageManager = new PageManager(VueRouter, this._container);
    }
    
    
    public useInstaller(installer: ComponentInstaller): this
    {
        given(installer, "installer").ensureHasValue();
        this._container.install(installer);
        return this;
    }
    
    public registerComponents(...componentViewModelClasses: Function[]): this
    {
        this._componentManager.registerComponents(...componentViewModelClasses);
        return this;
    }
    
    public registerPages(...pageViewModelClasses: Function[]): this
    {
        this._pageManager.registerPages(...pageViewModelClasses);
        return this;
    }
    
    public useAsInitialRoute(route: string): this
    {
        given(route, "route").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        this._initialRoute = route.trim();
        return this;
    }
    
    public useAsUnknownRoute(route: string): this
    {
        given(route, "route").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        this._pageManager.useAsUnknownRoute(route);
        return this;
    }
    
    public bootstrap(): void
    {
        this.configureCoreServices();
        this.configureContainer();
        this.configureComponents();
        this.configurePages();
        this.configureInitialRoute();
        this.configureRoot();
    }
    
    
    private configureCoreServices(): void
    {
        // TODO: implement this
    }
    
    private configureComponents(): void
    {
        this._componentManager.bootstrap();
    }
    
    private configurePages(): void
    {
        this._pageManager.bootstrap();
    }
    
    private configureContainer(): void
    {
        this._container.bootstrap();
    }
    
    private configureInitialRoute(): void
    { 
        if (!window.location.hash)
        {
            if (this._initialRoute)
                window.location.hash = "#" + this._initialRoute;    
        }   
        else
        {
            let hashVal = window.location.hash.trim();
            if (hashVal.length === 1)
            {
                if (this._initialRoute)
                    window.location.hash = "#" + this._initialRoute;
            }    
            else
            {
                hashVal = hashVal.substr(1);
                if (hashVal === "/")
                {
                    if (this._initialRoute)
                        window.location.hash = "#" + this._initialRoute;
                }    
            }    
        }
    }
    
    private configureRoot(): void
    {
        this._app = new Vue({
            el: this._appElementId,
            router: this._pageManager.vueRouterInstance
        });
    }
}