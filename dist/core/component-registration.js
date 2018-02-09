"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const view_model_registration_1 = require("./view-model-registration");
const element_1 = require("./element");
const n_exception_1 = require("@nivinjoseph/n-exception");
const bind_1 = require("./bind");
class ComponentRegistration extends view_model_registration_1.ViewModelRegistration {
    get element() { return this._element; }
    get bindings() { return this._bindings; }
    constructor(component) {
        n_defensive_1.given(component, "component").ensureHasValue();
        super(component);
        this._bindings = new Array();
        if (!Reflect.hasOwnMetadata(element_1.elementSymbol, this.viewModel))
            throw new n_exception_1.ApplicationException(`ComponentViewModel '${this.name}' does not have @element applied.`);
        this._element = Reflect.getOwnMetadata(element_1.elementSymbol, this.viewModel);
        if (Reflect.hasOwnMetadata(bind_1.bindSymbol, this.viewModel))
            this._bindings.push(...Reflect.getOwnMetadata(bind_1.bindSymbol, this.viewModel));
    }
}
exports.ComponentRegistration = ComponentRegistration;
//# sourceMappingURL=component-registration.js.map