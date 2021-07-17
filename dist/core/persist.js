"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.persist = exports.persistSymbol = void 0;
require("reflect-metadata");
require("@nivinjoseph/n-ext");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
exports.persistSymbol = Symbol("persist");
// public
function persist(target) {
    n_defensive_1.given(target, "target").ensureHasValue().ensureIsFunction();
    Reflect.defineMetadata(exports.persistSymbol, true, target);
}
exports.persist = persist;
//# sourceMappingURL=persist.js.map