"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const n_exception_1 = require("@nivinjoseph/n-exception");
// public
class ComponentViewModel {
    constructor() {
        this._watches = {};
    }
    get ctx() { return this["_ctx"]; }
    /** Override */
    onCreate() {
        if (this._executeOnCreate)
            this._executeOnCreate();
    }
    /** Override */
    onMount(element) { }
    /** Override */
    onDestroy() {
        for (let key in this._watches) {
            if (this._watches[key]) {
                this._watches[key]();
                this._watches[key] = undefined;
            }
        }
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
    watch(propertyName, callback) {
        if (!this.ctx)
            throw new n_exception_1.InvalidOperationException("calling watch() in the constructor");
        n_defensive_1.given(propertyName, "propertyName").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        propertyName = propertyName.trim();
        if (this._watches[propertyName])
            throw new n_exception_1.ApplicationException(`Watch already defined for property '${propertyName}'.`);
        this._watches[propertyName] = this.ctx.$watch(propertyName, function (newVal, oldVal) {
            callback(newVal, oldVal);
        }, { deep: true });
    }
    unWatch(propertyName) {
        n_defensive_1.given(propertyName, "propertyName").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        propertyName = propertyName.trim();
        if (this._watches[propertyName]) {
            this._watches[propertyName]();
            this._watches[propertyName] = undefined;
        }
    }
    getBound(propertyName) {
        if (!this.ctx)
            throw new n_exception_1.InvalidOperationException("calling getBound() in the constructor");
        n_defensive_1.given(propertyName, "propertyName").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        return this.ctx[propertyName];
    }
}
exports.ComponentViewModel = ComponentViewModel;
//# sourceMappingURL=component-view-model.js.map