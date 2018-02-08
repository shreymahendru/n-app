"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const n_defensive_1 = require("n-defensive");
require("n-ext");
exports.appRouteSymbol = Symbol("appRoute");
// public
function route(route) {
    n_defensive_1.given(route, "route").ensureHasValue()
        .ensure(t => !t.isEmptyOrWhiteSpace(), "cannot be empty or whitespace")
        .ensure(t => t.trim().startsWith("/"), "has to begin with '/'");
    return (target) => Reflect.defineMetadata(exports.appRouteSymbol, route.trim(), target);
}
exports.route = route;
//# sourceMappingURL=route.js.map