"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_view_model_1 = require("./base-view-model");
require("@nivinjoseph/n-ext");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
class PageViewModel extends base_view_model_1.BaseViewModel {
    get currentRoute() {
        let route = this.ctx.$route ? this.ctx.$route.fullPath : null;
        route = route ? route.trim() : null;
        if (route) {
            while (route.endsWith("/") || route.endsWith("?"))
                route = route.substr(0, route.length - 1).trimRight();
        }
        return route;
    }
    get pathArgs() {
        let routeArgs = this.__routeArgs;
        return routeArgs ? routeArgs.pathArgs : null;
    }
    get queryArgs() {
        let routeArgs = this.__routeArgs;
        return routeArgs ? routeArgs.queryArgs : null;
    }
    onEnter(...params) {
        n_defensive_1.given(params, "params").ensureHasValue().ensureIsArray();
    }
    onLeave() { }
}
exports.PageViewModel = PageViewModel;
//# sourceMappingURL=page-view-model.js.map