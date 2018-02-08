"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const n_defensive_1 = require("n-defensive");
require("n-ext");
// public
exports.templateSymbol = Symbol("template");
// public
function template(template) {
    n_defensive_1.given(template, "template")
        .ensureHasValue()
        .ensure(t => !t.isEmptyOrWhiteSpace());
    return (target) => Reflect.defineMetadata(exports.templateSymbol, template.trim(), target);
}
exports.template = template;
//# sourceMappingURL=template.js.map