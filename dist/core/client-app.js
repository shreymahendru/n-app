"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vue = require("./../../vendor/vue.v2.5.21.js");
exports.Vue = Vue;
const VueRouter = require("./../../vendor/vue-router.v3.0.2.js");
Vue.use(VueRouter);
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
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
const file_select_view_model_1 = require("../components/file-select-view-model");
class ClientApp {
    constructor(appElementId) {
        this._isBootstrapped = false;
        n_defensive_1.given(appElementId, "appElementId").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace()).ensure(t => t.startsWith("#"));
        this._appElementId = appElementId;
        this._container = new n_ject_1.Container();
        this._componentManager = new component_manager_1.ComponentManager(Vue, this._container);
        this._componentManager.registerComponents(file_select_view_model_1.FileSelectViewModel);
        this._pageManager = new page_manager_1.PageManager(VueRouter, this._container);
        Vue.config.silent = false;
        Vue.config.devtools = false;
        Vue.config.performance = false;
        Vue.config.productionTip = false;
    }
    get container() { return this._container; }
    useInstaller(installer) {
        if (this._isBootstrapped)
            throw new n_exception_1.InvalidOperationException("useInstaller");
        n_defensive_1.given(installer, "installer").ensureHasValue();
        this._container.install(installer);
        return this;
    }
    useAccentColor(color) {
        if (this._isBootstrapped)
            throw new n_exception_1.InvalidOperationException("useAccentColor");
        n_defensive_1.given(color, "color").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace())
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
        n_defensive_1.given(route, "route").ensureHasValue().ensureIsString();
        this._pageManager.useAsInitialRoute(route);
        return this;
    }
    useAsUnknownRoute(route) {
        if (this._isBootstrapped)
            throw new n_exception_1.InvalidOperationException("useAsUnknownRoute");
        n_defensive_1.given(route, "route").ensureHasValue().ensureIsString();
        this._pageManager.useAsUnknownRoute(route);
        return this;
    }
    useAsDefaultPageTitle(title) {
        if (this._isBootstrapped)
            throw new n_exception_1.InvalidOperationException("useAsDefaultPageTitle");
        n_defensive_1.given(title, "title").ensureHasValue().ensureIsString();
        this._pageManager.useAsDefaultPageTitle(title);
        return this;
    }
    useAsDefaultPageMetadata(...metas) {
        if (this._isBootstrapped)
            throw new n_exception_1.InvalidOperationException("useAsDefaultPageMetadata");
        n_defensive_1.given(metas, "metas").ensureHasValue().ensureIsArray().ensure(t => t.length > 0);
        this._pageManager.useAsDefaultPageMetadata(metas);
        return this;
    }
    useHistoryModeRouting() {
        if (this._isBootstrapped)
            throw new n_exception_1.InvalidOperationException("useHistoryModeRouting");
        this._pageManager.useHistoryModeRouting();
        return this;
    }
    bootstrap() {
        if (this._isBootstrapped)
            throw new n_exception_1.InvalidOperationException("bootstrap");
        this.configureGlobalConfig();
        this.configureComponents();
        this.configurePages();
        this.configureCoreServices();
        this.configureContainer();
        this.configureRoot();
        this._isBootstrapped = true;
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
    }
    configureComponents() {
        this._componentManager.bootstrap();
    }
    configurePages() {
        this._pageManager.bootstrap();
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
        this._app = new Vue({
            el: this._appElementId,
            router: this._pageManager.vueRouterInstance,
            provide: function () {
                return {
                    rootScopeContainer: container
                };
            }
        });
    }
}
exports.ClientApp = ClientApp;
//# sourceMappingURL=client-app.js.map