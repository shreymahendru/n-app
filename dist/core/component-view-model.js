"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("n-defensive");
// public
class ComponentViewModel {
    get ctx() { return this["_ctx"]; }
    onCreate() {
        if (this._executeOnCreate)
            this._executeOnCreate();
    }
    onDestroy() {
        if (this._executeOnDestroy)
            this._executeOnDestroy();
    }
    executeOnCreate(funcToExecute) {
        n_defensive_1.given(funcToExecute, "funcToExecute").ensureHasValue();
        this._executeOnCreate = funcToExecute;
    }
    executeOnDestroy(funcToExecute) {
        n_defensive_1.given(funcToExecute, "funcToExecute").ensureHasValue();
        this._executeOnDestroy = funcToExecute;
    }
}
exports.ComponentViewModel = ComponentViewModel;
//# sourceMappingURL=component-view-model.js.map