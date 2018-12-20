"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const view_model_registration_1 = require("./view-model-registration");
const route_1 = require("./route");
const n_exception_1 = require("@nivinjoseph/n-exception");
const route_info_1 = require("./route-info");
const title_1 = require("./title");
const meta_1 = require("./meta");
const authorize_1 = require("./authorize");
class PageRegistration extends view_model_registration_1.ViewModelRegistration {
    get route() { return this._route; }
    get redirect() { return this._redirect; }
    get title() { return this._title; }
    get metadata() { return this._metadata; }
    get hasAuthorize() { return this._hasAuthorize; }
    get useDefaultAuthorizer() { return this._useDefaultAuthorizer; }
    get authorizers() { return this._authorizers; }
    constructor(page, defaultPageTitle, defaultPageMetas) {
        n_defensive_1.given(page, "page").ensureHasValue().ensureIsFunction();
        n_defensive_1.given(defaultPageTitle, "defaultPageTitle").ensureIsString();
        n_defensive_1.given(defaultPageMetas, "defaultPageMetas").ensureIsArray();
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
        const metas = defaultPageMetas || [];
        if (Reflect.hasOwnMetadata(meta_1.metaSymbol, this.viewModel))
            metas.push(...Reflect.getOwnMetadata(meta_1.metaSymbol, this.viewModel));
        this._metadata = metas
            .reduce((acc, t) => {
            acc[t.name] = t.content;
            return acc;
        }, {});
        if (Reflect.hasOwnMetadata(authorize_1.authorizeSymbol, this.viewModel)) {
            this._hasAuthorize = true;
            const authorizers = Reflect.getOwnMetadata(authorize_1.authorizeSymbol, this.viewModel);
            if (authorizers.length > 0) {
                this._useDefaultAuthorizer = false;
                this._authorizers = authorizers;
            }
            else {
                this._useDefaultAuthorizer = true;
                this._authorizers = null;
            }
        }
        else {
            this._hasAuthorize = false;
            this._useDefaultAuthorizer = false;
            this._authorizers = null;
        }
    }
}
exports.PageRegistration = PageRegistration;
//# sourceMappingURL=page-registration.js.map