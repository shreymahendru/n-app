"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_view_model_1 = require("./base-view-model");
// public
class PageViewModel extends base_view_model_1.BaseViewModel {
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