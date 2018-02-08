"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_view_model_1 = require("./component-view-model");
// public
class PageViewModel extends component_view_model_1.ComponentViewModel {
    get pathArgs() {
        let routeArgs = this.__routeArgs;
        return routeArgs ? routeArgs.pathArgs : null;
    }
    get queryArgs() {
        let routeArgs = this.__routeArgs;
        return routeArgs ? routeArgs.queryArgs : null;
    }
    onEnter(...params) { }
    onLeave() { }
}
exports.PageViewModel = PageViewModel;
//# sourceMappingURL=page-view-model.js.map