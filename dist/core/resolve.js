"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = exports.resolveSymbol = void 0;
require("reflect-metadata");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
exports.resolveSymbol = Symbol("resolve");
function resolve(...resolvers) {
    n_defensive_1.given(resolvers, "resolvers").ensureHasValue().ensureIsArray().ensure(t => t.length > 0);
    const mapped = resolvers.map(t => {
        return {
            name: (" " + t.getTypeName().trim()).substr(1),
            value: t
        };
    });
    return (target) => Reflect.defineMetadata(exports.resolveSymbol, mapped, target);
}
exports.resolve = resolve;
//# sourceMappingURL=resolve.js.map