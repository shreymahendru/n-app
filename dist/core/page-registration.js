"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const view_model_registration_1 = require("./view-model-registration");
const route_1 = require("./route");
const n_exception_1 = require("@nivinjoseph/n-exception");
const route_info_1 = require("./route-info");
class PageRegistration extends view_model_registration_1.ViewModelRegistration {
    get route() { return this._route; }
    get redirect() { return this._redirect; }
    constructor(page) {
        n_defensive_1.given(page, "page").ensureHasValue();
        super(page);
        if (!Reflect.hasOwnMetadata(route_1.appRouteSymbol, this.viewModel))
            throw new n_exception_1.ApplicationException(`PageViewModel '${this.name}' does not have @route applied.`);
        const routeData = Reflect.getOwnMetadata(route_1.appRouteSymbol, this.viewModel);
        this._route = new route_info_1.RouteInfo(routeData.route);
        this._redirect = routeData.redirect;
    }
}
exports.PageRegistration = PageRegistration;
//# sourceMappingURL=page-registration.js.map