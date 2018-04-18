"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
exports.titleSymbol = Symbol("title");
// public
function title(title) {
    n_defensive_1.given(title, "title")
        .ensureHasValue()
        .ensure(t => !t.isEmptyOrWhiteSpace());
    return (target) => Reflect.defineMetadata(exports.titleSymbol, title.trim(), target);
}
exports.title = title;
//# sourceMappingURL=title.js.map