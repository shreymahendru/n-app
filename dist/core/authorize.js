"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
exports.authorizeSymbol = Symbol("authorize");
function authorize(...authorizers) {
    const formatted = authorizers.map(t => {
        if (typeof (t) === "string")
            return t.trim();
        return (" " + t.getTypeName().trim()).substr(1);
    });
    return (target) => Reflect.defineMetadata(exports.authorizeSymbol, formatted, target);
}
exports.authorize = authorize;
//# sourceMappingURL=authorize.js.map