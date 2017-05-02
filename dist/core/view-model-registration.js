"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("n-defensive");
require("n-ext");
const view_1 = require("./view");
const n_exception_1 = require("n-exception");
class ViewModelRegistration {
    get name() { return this._name; }
    get viewModel() { return this._viewModel; }
    // public get view(): string { return this._view; }
    get templateId() { return this._templateId; }
    constructor(viewModel) {
        n_defensive_1.given(viewModel, "viewModel").ensureHasValue();
        this._name = viewModel.getTypeName();
        this._viewModel = viewModel;
        if (!Reflect.hasOwnMetadata(view_1.viewSymbol, this._viewModel))
            throw new n_exception_1.ApplicationException(`ViewModel'${this._name}' does not have @view applied.`);
        this._view = Reflect.getOwnMetadata(view_1.viewSymbol, this._viewModel); // does not have to include .html extension
        this._templateId = this.generateTemplateId();
    }
    generateTemplateId() {
        let templateId = this._view.replace(".html", "").split("-").join("");
        if (document.getElementById(templateId) == null)
            throw new n_exception_1.ApplicationException(`Template with id ${templateId} not found for ViewModel ${this._name}`);
        return "#" + templateId;
    }
}
exports.ViewModelRegistration = ViewModelRegistration;
//# sourceMappingURL=view-model-registration.js.map