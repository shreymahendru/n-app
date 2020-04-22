"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
const template_1 = require("./template");
const n_exception_1 = require("@nivinjoseph/n-exception");
const components_1 = require("./components");
class ViewModelRegistration {
    constructor(viewModel) {
        n_defensive_1.given(viewModel, "viewModel").ensureHasValue();
        this._name = (" " + viewModel.getTypeName().trim()).substr(1);
        if (!this._name.endsWith("ViewModel"))
            throw new n_exception_1.ApplicationException(`Registered ViewModel '${this._name}' violates ViewModel naming convention.`);
        this._viewModel = viewModel;
        if (!Reflect.hasOwnMetadata(template_1.templateSymbol, this._viewModel))
            throw new n_exception_1.ApplicationException(`ViewModel'${this.name}' does not have @template applied.`);
        this._template = Reflect.getOwnMetadata(template_1.templateSymbol, this._viewModel);
        if (Reflect.hasOwnMetadata(components_1.componentsSymbol, this._viewModel))
            this._components = Reflect.getOwnMetadata(components_1.componentsSymbol, this._viewModel);
    }
    get name() { return this._name; }
    get viewModel() { return this._viewModel; }
    get template() { return this._template; }
    get components() { return this._components; }
}
exports.ViewModelRegistration = ViewModelRegistration;
//# sourceMappingURL=view-model-registration.js.map