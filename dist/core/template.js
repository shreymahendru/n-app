"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
exports.templateSymbol = Symbol("template");
function template(template) {
    n_defensive_1.given(template, "template")
        .ensureHasValue().ensureIsObject();
    return (target) => Reflect.defineMetadata(exports.templateSymbol, template, target);
}
exports.template = template;
//# sourceMappingURL=template.js.map