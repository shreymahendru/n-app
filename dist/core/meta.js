"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
exports.metaSymbol = Symbol("meta");
function meta(...metas) {
    n_defensive_1.given(metas, "metas")
        .ensureHasValue()
        .ensureIsArray()
        .ensure(t => t.length > 0);
    return (target) => Reflect.defineMetadata(exports.metaSymbol, metas, target);
}
exports.meta = meta;
//# sourceMappingURL=meta.js.map