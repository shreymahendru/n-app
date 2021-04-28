// const Vue = require("@nivinjoseph/vue/dist/vue.js");
// import Vue from "@nivinjoseph/vue";
const Vue = require("vue");

// public
export { Vue };

import VueRouter from "vue-router";
Vue.use(VueRouter);

import "@nivinjoseph/n-ext";
import { given } from "@nivinjoseph/n-defensive";
import { Container, ComponentInstaller } from "@nivinjoseph/n-ject";
import { ComponentManager } from "./component-manager";
import { PageManager } from "./page-manager";
import { InvalidOperationException } from "@nivinjoseph/n-exception";
import { DefaultDialogService } from "./../services/dialog-service/default-dialog-service";
import { DefaultEventAggregator } from "./../services/event-aggregator/default-event-aggregator";
import { DefaultNavigationService } from "./../services/navigation-service/default-navigation-service";
import { DefaultStorageService } from "./../services/storage-service/default-storage-service";
import { ConfigurationManager } from "@nivinjoseph/n-config";
import { DefaultDisplayService } from "../services/display-service/default-display-service";
import { DefaultComponentService } from "../services/component-service/default-component-service";
import { NFileSelectViewModel } from "../components/n-file-select/n-file-select-view-model";
import { NExpandingContainerViewModel } from "../components/n-expanding-container/n-expanding-container-view-model";
import { NScrollContainerViewModel } from "../components/n-scroll-container/n-scroll-container-view-model";

// declare const makeHot: (options: any) => void;

let makeHot: any;

if ((<any>module).hot)
{
    makeHot = function (options: any)
    {
        // console.log('is Hot');
        const api = require("vue-hot-reload-api");
        api.install(require("@nivinjoseph/vue"));

        if (!api.compatible)
            throw new Error("vue-hot-reload-api is not compatible with the version of Vue you are using.");

        (<any>module).hot.accept();

        if (!api.isRecorded("ClientAppRoot")) 
        {
            api.createRecord("ClientAppRoot", options);
            // console.log("creating record", "${id}");
        }
        else 
        {
            api.reload("ClientAppRoot", options);
            // console.log("updating record", "${id}");
        }
    };
}

// public
export class ClientApp
{
    private readonly _appElementId: string;
    private readonly _rootComponentElement: string;
    private readonly _container: Container;
    private readonly _componentManager: ComponentManager;
    private readonly _pageManager: PageManager;
    // @ts-ignore
    private _app: any;
    private _accentColor: string;
    private _isBootstrapped: boolean = false;
    
    
    public get container(): Container { return this._container; }


    public constructor(appElementId: string, rootComponentElement: string)
    {
        given(appElementId, "appElementId").ensureHasValue().ensureIsString().ensure(t => t.startsWith("#"));
        this._appElementId = appElementId;
        
        given(rootComponentElement, "rootComponentElement").ensureHasValue().ensureIsString();
        this._rootComponentElement = rootComponentElement;
        
        this._container = new Container();
        this._componentManager = new ComponentManager(Vue, this._container);
        this._componentManager.registerComponents(
            NFileSelectViewModel, NExpandingContainerViewModel, NScrollContainerViewModel
        );
        this._pageManager = new PageManager(VueRouter, this._container, this._componentManager);

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
        
        given(route, "route").ensureHasValue().ensureIsString();
        this._pageManager.useAsInitialRoute(route);
        return this;
    }

    public useAsUnknownRoute(route: string): this
    {
        if (this._isBootstrapped)
            throw new InvalidOperationException("useAsUnknownRoute");

        given(route, "route").ensureHasValue().ensureIsString();
        this._pageManager.useAsUnknownRoute(route);
        return this;
    }
    
    // /**
    //  * @deprecated
    //  */
    // public useAsDefaultPageTitle(title: string): this
    // {
    //     if (this._isBootstrapped)
    //         throw new InvalidOperationException("useAsDefaultPageTitle");
        
    //     given(title, "title").ensureHasValue().ensureIsString();
    //     this._pageManager.useAsDefaultPageTitle(title);
    //     return this;
    // }
    
    // /**
    //  * @deprecated
    //  */
    // public useAsDefaultPageMetadata(...metas: Array<{ name: string; content: string; }>): this
    // {
    //     if (this._isBootstrapped)
    //         throw new InvalidOperationException("useAsDefaultPageMetadata");
        
    //     given(metas, "metas").ensureHasValue().ensureIsArray().ensure(t => t.length > 0);
    //     this._pageManager.useAsDefaultPageMetadata(metas);
    //     return this;
    // }
    
    public useHistoryModeRouting(): this
    {
        if (this._isBootstrapped)
            throw new InvalidOperationException("useHistoryModeRouting");
        
        // if (this._initialRoute)
        //     throw new InvalidOperationException("Cannot use history mode with initial route.");
        
        this._pageManager.useHistoryModeRouting();
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
        this.configurePages();
        this.configureComponents();
        this.configureCoreServices();
        this.configureContainer();
        this.configureRoot();

        this._isBootstrapped = true;
        // this._pageManager.handleInitialRoute();
    }
    
    public retrieveRouterInstance(): object
    {
        if (!this._isBootstrapped)
            throw new InvalidOperationException("calling retrieveRouterInstance before calling bootstrap");
        
        if (this._pageManager.vueRouterInstance === null)
            throw new InvalidOperationException("calling retrieveRouterInstance with no page registrations");
        
        return this._pageManager.vueRouterInstance;
    }
    
    
    private configureGlobalConfig(): void
    {
        if (ConfigurationManager.getConfig("env") === "dev")
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
        
        // console.log(`Bootstrapping in ${ConfigurationManager.getConfig("env")} mode.`);

        // Vue.config.silent = false;
        // Vue.config.devtools = true;
        // Vue.config.performance = true;
        // Vue.config.productionTip = true;
    }


    private configureComponents(): void
    {
        this._componentManager.bootstrap();
    }

    private configurePages(): void
    {
        this._pageManager.bootstrap();
    }

    private configureCoreServices(): void
    {
        this._container
            .registerInstance("DialogService", new DefaultDialogService(this._accentColor))
            .registerInstance("EventAggregator", new DefaultEventAggregator())
            .registerInstance("NavigationService", new DefaultNavigationService(this._pageManager.vueRouterInstance))
            .registerInstance("StorageService", new DefaultStorageService())
            .registerInstance("DisplayService", new DefaultDisplayService())
            .registerInstance("ComponentService", new DefaultComponentService())
            ;
    }

    private configureContainer(): void
    {
        this._container.bootstrap();
    }

    private configureRoot(): void
    {
        const container = this._container;
        
        const componentOptions = {
            el: this._appElementId,
            render: (createElement: any) => createElement(this._rootComponentElement),
            router: this._pageManager.vueRouterInstance,
            provide: function ()
            {
                return {
                    rootScopeContainer: container
                };
            }
        };
        
        
        if (makeHot)
        {
            makeHot(componentOptions);
            console.log(`🔥 Hot Reload enabled`);
        }
        
        
        
        this._app = new Vue(componentOptions as any);
    }
}