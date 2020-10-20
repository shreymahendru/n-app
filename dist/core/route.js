"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = exports.appRouteSymbol = void 0;
require("reflect-metadata");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
exports.appRouteSymbol = Symbol("appRoute");
function route(route, redirect) {
    n_defensive_1.given(route, "route").ensureHasValue()
        .ensureIsString()
        .ensure(t => !t.isEmptyOrWhiteSpace(), "cannot be empty or whitespace")
        .ensure(t => t.trim().startsWith("/"), "has to begin with '/'");
    n_defensive_1.given(redirect, "redirect")
        .ensureIsString()
        .ensure(t => !t.isEmptyOrWhiteSpace(), "cannot be empty or whitespace")
        .ensure(t => t.trim().startsWith("/"), "has to begin with '/'")
        .ensure(t => t.trim().startsWith(route.trim()), "has to be a nested route");
    route = route.trim().replaceAll(" ", "");
    redirect = redirect ? redirect.trim().replaceAll(" ", "") : null;
    return (target) => Reflect.defineMetadata(exports.appRouteSymbol, { route, redirect }, target);
}
exports.route = route;
//# sourceMappingURL=route.js.map