"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientApp = exports.Vue = void 0;
// const Vue = require("@nivinjoseph/vue/dist/vue.js");
// import Vue from "@nivinjoseph/vue";
const Vue = require("vue");
exports.Vue = Vue;
const vue_router_1 = require("vue-router");
Vue.use(vue_router_1.default);
require("@nivinjoseph/n-ext");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const n_ject_1 = require("@nivinjoseph/n-ject");
const component_manager_1 = require("./component-manager");
const page_manager_1 = require("./page-manager");
const n_exception_1 = require("@nivinjoseph/n-exception");
const default_dialog_service_1 = require("./../services/dialog-service/default-dialog-service");
const default_event_aggregator_1 = require("./../services/event-aggregator/default-event-aggregator");
const default_navigation_service_1 = require("./../services/navigation-service/default-navigation-service");
const default_storage_service_1 = require("./../services/storage-service/default-storage-service");
const n_config_1 = require("@nivinjoseph/n-config");
const default_display_service_1 = require("../services/display-service/default-display-service");
const default_component_service_1 = require("../services/component-service/default-component-service");
const n_file_select_view_model_1 = require("../components/n-file-select/n-file-select-view-model");
const n_expanding_container_view_model_1 = require("../components/n-expanding-container/n-expanding-container-view-model");
const n_scroll_container_view_model_1 = require("../components/n-scroll-container/n-scroll-container-view-model");
// declare const makeHot: (options: any) => void;
let makeHot;
if (module.hot) {
    makeHot = function (options) {
        // console.log('is Hot');
        const api = require("vue-hot-reload-api");
        api.install(require("@nivinjoseph/vue"));
        if (!api.compatible)
            throw new Error("vue-hot-reload-api is not compatible with the version of Vue you are using.");
        module.hot.accept();
        if (!api.isRecorded("ClientAppRoot")) {
            api.createRecord("ClientAppRoot", options);
            // console.log("creating record", "${id}");
        }
        else {
            api.reload("ClientAppRoot", options);
            // console.log("updating record", "${id}");
        }
    };
}
// public
class ClientApp {
    /**
     *
     * @param appElementId
     * @param rootComponentElement
     *
     * @description Requires dev dependencies
     * Check the dev dependencies in package.json
     */
    constructor(appElementId, rootComponentElement) {
        this._isBootstrapped = false;
        (0, n_defensive_1.given)(appElementId, "appElementId").ensureHasValue().ensureIsString().ensure(t => t.startsWith("#"));
        this._appElementId = appElementId;
        (0, n_defensive_1.given)(rootComponentElement, "rootComponentElement").ensureHasValue().ensureIsString();
        this._rootComponentElement = rootComponentElement;
        this._container = new n_ject_1.Container();
        this._componentManager = new component_manager_1.ComponentManager(Vue, this._container);
        this._componentManager.registerComponents(n_file_select_view_model_1.NFileSelectViewModel, n_expanding_container_view_model_1.NExpandingContainerViewModel, n_scroll_container_view_model_1.NScrollContainerViewModel);
        this._pageManager = new page_manager_1.PageManager(vue_router_1.default, this._container, this._componentManager);
        Vue.config.silent = false;
        Vue.config.devtools = false;
        Vue.config.performance = false;
        Vue.config.productionTip = false;
    }
    get container() { return this._container; }
    useInstaller(installer) {
        if (this._isBootstrapped)
            throw new n_exception_1.InvalidOperationException("useInstaller");
        (0, n_defensive_1.given)(installer, "installer").ensureHasValue();
        this._container.install(installer);
        return this;
    }
    useAccentColor(color) {
        if (this._isBootstrapped)
            throw new n_exception_1.InvalidOperationException("useAccentColor");
        (0, n_defensive_1.given)(color, "color").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace())
            .ensure(t => t.trim().startsWith("#"), "must be hex value");
        this._accentColor = color.trim();
        return this;
    }
    registerComponents(...componentViewModelClasses) {
        if (this._isBootstrapped)
            throw new n_exception_1.InvalidOperationException("registerComponents");
        this._componentManager.registerComponents(...componentViewModelClasses);
        return this;
    }
    registerPages(...pageViewModelClasses) {
        if (this._isBootstrapped)
            throw new n_exception_1.InvalidOperationException("registerPages");
        this._pageManager.registerPages(...pageViewModelClasses);
        return this;
    }
    useAsInitialRoute(route) {
        if (this._isBootstrapped)
            throw new n_exception_1.InvalidOperationException("useAsInitialRoute");
        (0, n_defensive_1.given)(route, "route").ensureHasValue().ensureIsString();
        this._pageManager.useAsInitialRoute(route);
        return this;
    }
    useAsUnknownRoute(route) {
        if (this._isBootstrapped)
            throw new n_exception_1.InvalidOperationException("useAsUnknownRoute");
        (0, n_defensive_1.given)(route, "route").ensureHasValue().ensureIsString();
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
    useHistoryModeRouting() {
        if (this._isBootstrapped)
            throw new n_exception_1.InvalidOperationException("useHistoryModeRouting");
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
    configureErrorTracking(callback) {
        (0, n_defensive_1.given)(callback, "callback").ensureHasValue().ensureIsFunction();
        if (this._isBootstrapped)
            throw new n_exception_1.InvalidOperationException("calling method after bootstrap");
        this._errorTrackingConfigurationCallback = callback;
        return this;
    }
    bootstrap() {
        if (this._isBootstrapped)
            throw new n_exception_1.InvalidOperationException("bootstrap");
        this.configureGlobalConfig();
        this.configurePages();
        this._configureErrorTracking();
        this.configureComponents();
        this.configureCoreServices();
        this.configureContainer();
        this.configureRoot();
        this._isBootstrapped = true;
        // this._pageManager.handleInitialRoute();
    }
    retrieveRouterInstance() {
        if (!this._isBootstrapped)
            throw new n_exception_1.InvalidOperationException("calling retrieveRouterInstance before calling bootstrap");
        if (this._pageManager.vueRouterInstance === null)
            throw new n_exception_1.InvalidOperationException("calling retrieveRouterInstance with no page registrations");
        return this._pageManager.vueRouterInstance;
    }
    configureGlobalConfig() {
        if (n_config_1.ConfigurationManager.getConfig("env") === "dev") {
            console.log("Bootstrapping in DEV mode.");
            Vue.config.silent = false;
            Vue.config.devtools = true;
            Vue.config.performance = true;
            Vue.config.productionTip = true;
        }
        else {
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
    configureComponents() {
        this._componentManager.bootstrap();
    }
    configurePages() {
        this._pageManager.bootstrap();
    }
    _configureErrorTracking() {
        if (this._errorTrackingConfigurationCallback != null)
            this._errorTrackingConfigurationCallback(this._pageManager.vueRouterInstance);
    }
    configureCoreServices() {
        this._container
            .registerInstance("DialogService", new default_dialog_service_1.DefaultDialogService(this._accentColor))
            .registerInstance("EventAggregator", new default_event_aggregator_1.DefaultEventAggregator())
            .registerInstance("NavigationService", new default_navigation_service_1.DefaultNavigationService(this._pageManager.vueRouterInstance))
            .registerInstance("StorageService", new default_storage_service_1.DefaultStorageService())
            .registerInstance("DisplayService", new default_display_service_1.DefaultDisplayService())
            .registerInstance("ComponentService", new default_component_service_1.DefaultComponentService());
    }
    configureContainer() {
        this._container.bootstrap();
    }
    configureRoot() {
        const container = this._container;
        const componentOptions = {
            el: this._appElementId,
            render: (createElement) => createElement(this._rootComponentElement),
            router: this._pageManager.vueRouterInstance,
            provide: function () {
                return {
                    rootScopeContainer: container
                };
            }
        };
        if (makeHot) {
            makeHot(componentOptions);
            console.log(`🔥 Hot Reload enabled`);
        }
        this._app = new Vue(componentOptions);
    }
}
exports.ClientApp = ClientApp;
//# sourceMappingURL=client-app.js.map