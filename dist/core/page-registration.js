"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const view_model_registration_1 = require("./view-model-registration");
const route_1 = require("./route");
const n_exception_1 = require("@nivinjoseph/n-exception");
const route_info_1 = require("./route-info");
const title_1 = require("./title");
class PageRegistration extends view_model_registration_1.ViewModelRegistration {
    get route() { return this._route; }
    get redirect() { return this._redirect; }
    get title() { return this._title; }
    constructor(page, defaultPageTitle) {
        n_defensive_1.given(page, "page").ensureHasValue().ensureIsFunction();
        n_defensive_1.given(defaultPageTitle, "defaultPageTitle").ensureIsString();
        super(page);
        if (!Reflect.hasOwnMetadata(route_1.appRouteSymbol, this.viewModel))
            throw new n_exception_1.ApplicationException(`PageViewModel '${this.name}' does not have @route applied.`);
        const routeData = Reflect.getOwnMetadata(route_1.appRouteSymbol, this.viewModel);
        this._route = new route_info_1.RouteInfo(routeData.route);
        this._redirect = routeData.redirect;
        let title = defaultPageTitle || null;
        if (Reflect.hasOwnMetadata(title_1.titleSymbol, this.viewModel))
            title = Reflect.getOwnMetadata(title_1.titleSymbol, this.viewModel);
        this._title = title;
    }
}
exports.PageRegistration = PageRegistration;
//# sourceMappingURL=page-registration.js.map