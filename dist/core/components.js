"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.components = exports.componentsSymbol = void 0;
require("reflect-metadata");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
exports.componentsSymbol = Symbol("components");
function components(...components) {
    n_defensive_1.given(components, "components").ensureHasValue().ensureIsArray().ensure(t => t.length > 0);
    return (target) => Reflect.defineMetadata(exports.componentsSymbol, components, target);
}
exports.components = components;
//# sourceMappingURL=components.js.map