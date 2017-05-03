"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vue = require("./../../vendor/vue.v2.3.2.js");
const VueRouter = require("./../../vendor/vue-router.v2.5.3.js");
Vue.use(VueRouter);
const config_1 = require("./config");
const n_defensive_1 = require("n-defensive");
require("n-ext");
const n_ject_1 = require("n-ject");
const component_manager_1 = require("./component-manager");
const page_manager_1 = require("./page-manager");
const n_exception_1 = require("n-exception");
const default_dialog_service_1 = require("./../services/dialog-service/default-dialog-service");
const default_event_aggregator_1 = require("./../services/event-aggregator/default-event-aggregator");
const default_navigation_service_1 = require("./../services/navigation-service/default-navigation-service");
const default_storage_service_1 = require("./../services/storage-service/default-storage-service");
// public
class ClientApp {
    constructor(appElementId) {
        this._isbootstrapped = false;
        n_defensive_1.given(appElementId, "appElementId").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace()).ensure(t => t.startsWith("#"));
        this._appElementId = appElementId;
        this._container = new n_ject_1.Container();
        this._componentManager = new component_manager_1.ComponentManager(Vue, this._container);
        this._pageManager = new page_manager_1.PageManager(VueRouter, this._container);
        Vue.config.silent = false;
        Vue.config.devtools = false;
        Vue.config.performance = false;
        Vue.config.productionTip = false;
    }
    useInstaller(installer) {
        if (this._isbootstrapped)
            throw new n_exception_1.InvalidOperationException("useInstaller");
        n_defensive_1.given(installer, "installer").ensureHasValue();
        this._container.install(installer);
        return this;
    }
    useAccentColor(color) {
        if (this._isbootstrapped)
            throw new n_exception_1.InvalidOperationException("useAccentColor");
        n_defensive_1.given(color, "color").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace())
            .ensure(t => t.trim().startsWith("#"), "must be hex value");
        this._accentColor = color.trim();
        return this;
    }
    registerComponents(...componentViewModelClasses) {
        if (this._isbootstrapped)
            throw new n_exception_1.InvalidOperationException("registerComponents");
        this._componentManager.registerComponents(...componentViewModelClasses);
        return this;
    }
    registerPages(...pageViewModelClasses) {
        if (this._isbootstrapped)
            throw new n_exception_1.InvalidOperationException("registerPages");
        this._pageManager.registerPages(...pageViewModelClasses);
        return this;
    }
    useAsInitialRoute(route) {
        if (this._isbootstrapped)
            throw new n_exception_1.InvalidOperationException("useAsInitialRoute");
        n_defensive_1.given(route, "route").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        this._initialRoute = route.trim();
        return this;
    }
    useAsUnknownRoute(route) {
        if (this._isbootstrapped)
            throw new n_exception_1.InvalidOperationException("useAsUnknownRoute");
        n_defensive_1.given(route, "route").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        this._pageManager.useAsUnknownRoute(route);
        return this;
    }
    enableDevMode() {
        if (this._isbootstrapped)
            throw new n_exception_1.InvalidOperationException("enableDevMode");
        config_1.Config.enableDev(Vue);
        return this;
    }
    bootstrap() {
        if (this._isbootstrapped)
            throw new n_exception_1.InvalidOperationException("bootstrap");
        if (config_1.Config.isDev)
            console.log("Bootstrapping in DEV mode.");
        this.configureComponents();
        this.configurePages();
        this.configureInitialRoute();
        this.configureCoreServices();
        this.configureContainer();
        this.configureRoot();
        this._isbootstrapped = true;
    }
    configureComponents() {
        this._componentManager.bootstrap();
    }
    configurePages() {
        this._pageManager.bootstrap();
    }
    configureInitialRoute() {
        if (!this._pageManager.vueRouterInstance)
            return;
        if (!window.location.hash) {
            if (this._initialRoute)
                window.location.hash = "#" + this._initialRoute;
        }
        else {
            let hashVal = window.location.hash.trim();
            if (hashVal.length === 1) {
                if (this._initialRoute)
                    window.location.hash = "#" + this._initialRoute;
            }
            else {
                hashVal = hashVal.substr(1);
                if (hashVal === "/") {
                    if (this._initialRoute)
                        window.location.hash = "#" + this._initialRoute;
                }
            }
        }
    }
    configureCoreServices() {
        this._container
            .registerInstance("DialogService", new default_dialog_service_1.DefaultDialogService(this._accentColor))
            .registerInstance("EventAggregator", new default_event_aggregator_1.DefaultEventAggregator())
            .registerInstance("NavigationService", new default_navigation_service_1.DefaultNavigationService(this._pageManager.vueRouterInstance))
            .registerInstance("StorageService", new default_storage_service_1.DefaultStorageService());
    }
    configureContainer() {
        this._container.bootstrap();
    }
    configureRoot() {
        this._app = new Vue({
            el: this._appElementId,
            router: this._pageManager.vueRouterInstance
        });
    }
}
exports.ClientApp = ClientApp;
//# sourceMappingURL=client-app.js.map