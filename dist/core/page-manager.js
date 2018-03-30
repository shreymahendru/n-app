"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const page_registration_1 = require("./page-registration");
const n_exception_1 = require("@nivinjoseph/n-exception");
const page_1 = require("./page");
const page_tree_builder_1 = require("./page-tree-builder");
class PageManager {
    constructor(vueRouter, container) {
        this._registrations = new Array();
        this._useHistoryMode = false;
        n_defensive_1.given(vueRouter, "vueRouter").ensureHasValue();
        n_defensive_1.given(container, "container").ensureHasValue();
        this._vueRouter = vueRouter;
        this._container = container;
    }
    get useHistoryMode() { return this._useHistoryMode; }
    get vueRouterInstance() { return this._vueRouterInstance; }
    registerPages(...pageViewModelClasses) {
        for (let item of pageViewModelClasses)
            this.registerPage(item);
    }
    useAsInitialRoute(route) {
        n_defensive_1.given(route, "route").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        this._initialRoute = route.trim();
    }
    useAsUnknownRoute(route) {
        n_defensive_1.given(route, "route").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        this._unknownRoute = route.trim();
    }
    useHistoryModeRouting() {
        this._useHistoryMode = true;
    }
    bootstrap() {
        if (this._registrations.length === 0)
            return;
        let pageTree = this.createPageTree();
        let vueRouterRoutes = pageTree.map(t => t.createVueRouterRoute(this._container));
        if (this._unknownRoute)
            vueRouterRoutes.push({ path: "*", redirect: this._unknownRoute });
        let vueRouter = this._vueRouter;
        const routerOptions = {
            routes: vueRouterRoutes,
            scrollBehavior: function (to, from, savedPosition) {
                return { x: 0, y: 0 };
            }
        };
        if (this._useHistoryMode)
            routerOptions.mode = "history";
        this._vueRouterInstance = new vueRouter(routerOptions);
        this.configureInitialRoute();
    }
    registerPage(pageViewModelClass) {
        let registration = new page_registration_1.PageRegistration(pageViewModelClass);
        if (this._registrations.some(t => t.name === registration.name))
            throw new n_exception_1.ApplicationException(`Duplicate Page registration with name '${registration.name}'.`);
        if (this._registrations.some(t => t.route.routeKey === registration.route.routeKey))
            throw new n_exception_1.ApplicationException(`Route conflict detected for Page registration with name '${registration.name}'`);
        this._registrations.push(registration);
        this._container.registerTransient(registration.name, registration.viewModel);
    }
    createPageTree() {
        let root = new page_1.Page("/", null);
        let treeBuilder = new page_tree_builder_1.PageTreeBuilder(root, this._registrations);
        return treeBuilder.build();
    }
    configureInitialRoute() {
        if (!this._initialRoute || this._initialRoute.isEmptyOrWhiteSpace())
            return;
        if (this._useHistoryMode) {
            if (!window.location.pathname || window.location.pathname.toString().isEmptyOrWhiteSpace() ||
                window.location.pathname.toString().trim() === "/" || window.location.pathname.toString().trim() === "null")
                this._vueRouterInstance.replace(this._initialRoute);
            return;
        }
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
}
exports.PageManager = PageManager;
//# sourceMappingURL=page-manager.js.map