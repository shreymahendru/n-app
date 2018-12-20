"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const page_registration_1 = require("./page-registration");
const n_exception_1 = require("@nivinjoseph/n-exception");
const page_1 = require("./page");
const page_tree_builder_1 = require("./page-tree-builder");
class PageManager {
    constructor(vueRouter, container) {
        this._pageViewModelClasses = new Array();
        this._authorizerClasses = new Array();
        this._authorizers = new Array();
        this._registrations = new Array();
        this._vueRouterInstance = null;
        this._initialRoute = null;
        this._unknownRoute = null;
        this._defaultPageTitle = null;
        this._defaultPageMetas = null;
        this._useHistoryMode = false;
        this._defaultAuthorizerClass = null;
        this._defaultAuthorizer = null;
        this._authorizeFailRoute = null;
        n_defensive_1.given(vueRouter, "vueRouter").ensureHasValue();
        n_defensive_1.given(container, "container").ensureHasValue();
        this._vueRouter = vueRouter;
        this._container = container;
    }
    get useHistoryMode() { return this._useHistoryMode; }
    get vueRouterInstance() { return this._vueRouterInstance; }
    registerPages(...pageViewModelClasses) {
        this._pageViewModelClasses.push(...pageViewModelClasses);
    }
    registerAuthorizers(...authorizerClasses) {
        this._authorizerClasses.push(...authorizerClasses);
    }
    useAsDefaultAuthorizer(authorizerClass) {
        n_defensive_1.given(authorizerClass, "authorizerClass").ensureHasValue().ensureIsFunction();
        this._defaultAuthorizerClass = authorizerClass;
    }
    useAsAuthorizeFailRoute(route) {
        n_defensive_1.given(route, "route").ensureHasValue().ensureIsString();
        this._authorizeFailRoute = route.trim();
    }
    useAsInitialRoute(route) {
        n_defensive_1.given(route, "route").ensureHasValue().ensureIsString();
        this._initialRoute = route.trim();
    }
    useAsUnknownRoute(route) {
        n_defensive_1.given(route, "route").ensureHasValue().ensureIsString();
        this._unknownRoute = route.trim();
    }
    useAsDefaultPageTitle(title) {
        n_defensive_1.given(title, "title").ensureHasValue().ensureIsString();
        this._defaultPageTitle = title.trim();
    }
    useAsDefaultPageMetadata(metas) {
        n_defensive_1.given(metas, "metas").ensureHasValue().ensureIsArray().ensure(t => t.length > 0);
        this._defaultPageMetas = [...metas];
    }
    useHistoryModeRouting() {
        this._useHistoryMode = true;
    }
    bootstrap() {
        if (this._defaultAuthorizerClass) {
            this.registerAuthorizer(this._defaultAuthorizerClass);
            this._defaultAuthorizer = (" " + this._defaultAuthorizerClass.getTypeName().trim()).substr(1);
        }
        this._authorizerClasses.forEach(t => this.registerAuthorizer(t));
        this._pageViewModelClasses.forEach(t => this.registerPage(t));
        if (this._registrations.length === 0)
            return;
        this.createRouting();
        this.configureAuthorization();
    }
    registerAuthorizer(authorizerClass) {
        const name = (" " + authorizerClass.getTypeName().trim()).substr(1);
        if (this._authorizers.some(t => t === name))
            throw new n_exception_1.ApplicationException(`Duplicate Authorizer registration with name '${name}'.`);
        this._container.registerTransient(name, authorizerClass);
        this._authorizers.push(name);
    }
    registerPage(pageViewModelClass) {
        let registration = new page_registration_1.PageRegistration(pageViewModelClass, this._defaultPageTitle, this._defaultPageMetas);
        if (this._registrations.some(t => t.name === registration.name))
            throw new n_exception_1.ApplicationException(`Duplicate Page registration with name '${registration.name}'.`);
        if (this._registrations.some(t => t.route.routeKey === registration.route.routeKey))
            throw new n_exception_1.ApplicationException(`Route conflict detected for Page registration with name '${registration.name}'`);
        if (registration.hasAuthorize) {
            if (registration.useDefaultAuthorizer) {
                if (!this._defaultAuthorizerClass)
                    throw new n_exception_1.ApplicationException(`Page registration with name '${registration.name}' wants to use default Authorizer but no default Authorizer is configured for use.`);
            }
            else {
                registration.authorizers.forEach(t => {
                    if (this._authorizers.some(u => u === t))
                        return;
                    throw new n_exception_1.ApplicationException(`Page registration with name '${registration.name}' wants to use Authorizer with name '${t}' but no such Authorizer is registered.`);
                });
            }
        }
        this._registrations.push(registration);
        this._container.registerTransient(registration.name, registration.viewModel);
    }
    createRouting() {
        let pageTree = this.createPageTree();
        let vueRouterRoutes = pageTree.map(t => t.createVueRouterRoute());
        if (this._initialRoute)
            vueRouterRoutes.push({ path: "/", redirect: this._initialRoute });
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
    }
    createPageTree() {
        let root = new page_1.Page("/", null);
        let treeBuilder = new page_tree_builder_1.PageTreeBuilder(root, this._registrations);
        return treeBuilder.build();
    }
    configureAuthorization() {
        this._vueRouterInstance.beforeEach((to, from, next) => {
            const registrationName = to.name + "ViewModel";
            const registration = this._registrations.find(t => t.name === registrationName);
            if (registration.hasAuthorize) {
                const authorizers = registration.useDefaultAuthorizer
                    ? [this._container.resolve(this._defaultAuthorizer)]
                    : registration.authorizers.map(t => this._container.resolve(t));
                authorizers.forEach(t => {
                    let passed = true;
                    try {
                        passed = t.authorize();
                    }
                    catch (error) {
                        console.error(`${t.getTypeName()} Error =>`, error);
                        passed = false;
                    }
                    if (!passed) {
                        next(this._authorizeFailRoute || false);
                        return;
                    }
                });
            }
            next();
        });
    }
}
exports.PageManager = PageManager;
//# sourceMappingURL=page-manager.js.map