"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const n_exception_1 = require("@nivinjoseph/n-exception");
const base_view_model_1 = require("./base-view-model");
// public
class ComponentViewModel extends base_view_model_1.BaseViewModel {
    get bindings() { return this["_bindings"]; }
    getBound(propertyName) {
        if (!this.ctx)
            throw new n_exception_1.InvalidOperationException("calling getBound() in the constructor");
        n_defensive_1.given(propertyName, "propertyName").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace())
            .ensure(t => this.bindings.some(u => u === t), `No binding with the name '${propertyName}' found`);
        return this.ctx[propertyName];
    }
    getBoundModel() {
        if (!this.ctx)
            throw new n_exception_1.InvalidOperationException("calling getBoundModel() in the constructor");
        if (!this.bindings.some(t => t === "value"))
            throw new n_exception_1.InvalidOperationException("calling getBoundModel() without defining 'value' in bind");
        return this.ctx["value"];
    }
    setBoundModel(value) {
        if (!this.ctx)
            throw new n_exception_1.InvalidOperationException("calling setBoundModel() in the constructor");
        if (!this.bindings.some(t => t === "value"))
            throw new n_exception_1.InvalidOperationException("calling setBoundModel() without defining 'value' in bind");
        this.ctx.$emit("input", value);
    }
}
exports.ComponentViewModel = ComponentViewModel;
//# sourceMappingURL=component-view-model.js.map