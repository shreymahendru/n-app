"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const page_component_factory_1 = require("./page-component-factory");
class Page {
    constructor(segment, parent) {
        this._children = new Array();
        n_defensive_1.given(segment, "segment").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        this._segment = segment;
        if (parent)
            this.changeParent(parent);
    }
    get segment() { return this._segment; }
    get parent() { return this._parent; }
    get children() { return this._children.map(t => t); }
    get registration() { return this._registration; }
    attachRegistration(registration) {
        n_defensive_1.given(registration, "registration").ensureHasValue();
        this._registration = registration;
    }
    addChild(childPage) {
        n_defensive_1.given(childPage, "childPage").ensureHasValue();
        this._children.push(childPage);
    }
    removeChild(childPage) {
        n_defensive_1.given(childPage, "childPage").ensureHasValue()
            .ensure(t => this._children.some(u => u === t), "child not present");
        this._children.remove(childPage);
    }
    changeParent(parent) {
        if (this._parent)
            this._parent.removeChild(this);
        this._parent = parent;
        if (this._parent)
            this._parent.addChild(this);
    }
    createVueRouterRoute(container) {
        let factory = new page_component_factory_1.PageComponentFactory(container);
        let vueRouterRoute = {
            path: this.createRoute(),
            component: factory.create(this._registration)
        };
        if (this._children.length > 0)
            vueRouterRoute.children = this._children.map(t => t.createVueRouterRoute(container));
        return vueRouterRoute;
    }
    createRoute() {
        let route = this._registration.route.vueRoute;
        if (!this._parent)
            return route;
        route = route.replace(this._parent.registration.route.vueRoute, "");
        if (route.startsWith("/"))
            route = route.substr(1);
        return route;
    }
}
exports.Page = Page;
//# sourceMappingURL=page.js.map