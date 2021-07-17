"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.persist = exports.persistSymbol = void 0;
require("reflect-metadata");
require("@nivinjoseph/n-ext");
exports.persistSymbol = Symbol("persist");
// public
function persist() {
    return (target) => Reflect.defineMetadata(exports.persistSymbol, true, target);
}
exports.persist = persist;
//# sourceMappingURL=persist.js.map