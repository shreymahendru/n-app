const Vue = require("./../../vendor/vue.v2.4.2.js");

// public
export { Vue }

const VueRouter = require("./../../vendor/vue-router.v2.7.0.js");
Vue.use(VueRouter);

// const VueMaterial = require("./../../vendor/vue-material.v0.7.4.js");
// Vue.use(VueMaterial);


import { given } from "n-defensive";
import "n-ext";
import { Container, ComponentInstaller } from "n-ject";
import { ComponentManager } from "./component-manager";
import { PageManager } from "./page-manager";
import { InvalidOperationException } from "n-exception";
import { DefaultDialogService } from "./../services/dialog-service/default-dialog-service";
import { DefaultEventAggregator } from "./../services/event-aggregator/default-event-aggregator";
import { DefaultNavigationService } from "./../services/navigation-service/default-navigation-service";
import { DefaultStorageService } from "./../services/storage-service/default-storage-service";


// public
export class ClientApp
{
    private readonly _appElementId: string;
    private readonly _container: Container;
    private readonly _componentManager: ComponentManager;
    private readonly _pageManager: PageManager;
    private _initialRoute: string;
    private _app: any;
    private _accentColor: string;
    private _isBootstrapped: boolean = false;
    
    
    public get container(): Container { return this._container; }


    public constructor(appElementId: string)
    {
        given(appElementId, "appElementId").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace()).ensure(t => t.startsWith("#"));
        this._appElementId = appElementId;
        this._container = new Container();
        this._componentManager = new ComponentManager(Vue, this._container);
        this._pageManager = new PageManager(VueRouter, this._container);

        Vue.config.silent = false;
        Vue.config.devtools = false;
        Vue.config.performance = false;
        Vue.config.productionTip = false;
    }


    public useInstaller(installer: ComponentInstaller): this
    {
        if (this._isBootstrapped)
            throw new InvalidOperationException("useInstaller");

        given(installer, "installer").ensureHasValue();
        this._container.install(installer);
        return this;
    }

    public useAccentColor(color: string): this
    {
        if (this._isBootstrapped)
            throw new InvalidOperationException("useAccentColor");

        given(color, "color").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace())
            .ensure(t => t.trim().startsWith("#"), "must be hex value");

        this._accentColor = color.trim();
        return this;
    }

    public registerComponents(...componentViewModelClasses: Function[]): this
    {
        if (this._isBootstrapped)
            throw new InvalidOperationException("registerComponents");

        this._componentManager.registerComponents(...componentViewModelClasses);
        return this;
    }

    public registerPages(...pageViewModelClasses: Function[]): this
    {
        if (this._isBootstrapped)
            throw new InvalidOperationException("registerPages");

        this._pageManager.registerPages(...pageViewModelClasses);
        return this;
    }

    public useAsInitialRoute(route: string): this
    {
        if (this._isBootstrapped)
            throw new InvalidOperationException("useAsInitialRoute");

        given(route, "route").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        this._initialRoute = route.trim();
        return this;
    }

    public useAsUnknownRoute(route: string): this
    {
        if (this._isBootstrapped)
            throw new InvalidOperationException("useAsUnknownRoute");

        given(route, "route").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        this._pageManager.useAsUnknownRoute(route);
        return this;
    }

    // public enableDevMode(): this
    // {
    //     if (this._isbootstrapped)
    //         throw new InvalidOperationException("enableDevMode");

    //     Config.enableDev(Vue);
    //     return this;
    // }

    public bootstrap(): void
    {
        if (this._isBootstrapped)
            throw new InvalidOperationException("bootstrap");

        this.configureGlobalConfig();
        this.configureComponents();
        this.configurePages();
        this.configureInitialRoute();
        this.configureCoreServices();
        this.configureContainer();
        this.configureRoot();

        this._isBootstrapped = true;
    }
    
    private configureGlobalConfig(): void
    {
        if ((<any>window).appConfig.mode === "dev")
        {
            console.log("Bootstrapping in DEV mode.");

            Vue.config.silent = false;
            Vue.config.devtools = true;
            Vue.config.performance = true;
            Vue.config.productionTip = true;
        }
        else
        {
            Vue.config.silent = true;
            Vue.config.devtools = false;
            Vue.config.performance = false;
            Vue.config.productionTip = false;
        }
    }


    private configureComponents(): void
    {
        this._componentManager.bootstrap();
    }

    private configurePages(): void
    {
        this._pageManager.bootstrap();
    }

    private configureInitialRoute(): void
    {
        if (!this._pageManager.vueRouterInstance)
            return;

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

    private configureCoreServices(): void
    {
        this._container
            .registerInstance("DialogService", new DefaultDialogService(this._accentColor))
            .registerInstance("EventAggregator", new DefaultEventAggregator())
            .registerInstance("NavigationService", new DefaultNavigationService(this._pageManager.vueRouterInstance))
            .registerInstance("StorageService", new DefaultStorageService())
            ;
    }

    private configureContainer(): void
    {
        this._container.bootstrap();
    }

    private configureRoot(): void
    {
        this._app = new Vue({
            el: this._appElementId,
            router: this._pageManager.vueRouterInstance
        });
    }
}