"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const n_defensive_1 = require("n-defensive");
require("n-ext");
exports.elementSymbol = Symbol("element");
// public
function element(elementName) {
    n_defensive_1.given(elementName, "elementName").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
    return (target) => Reflect.defineMetadata(exports.elementSymbol, elementName, target);
}
exports.element = element;
//# sourceMappingURL=element.js.map