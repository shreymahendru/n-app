"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const component_registration_1 = require("./component-registration");
const n_exception_1 = require("@nivinjoseph/n-exception");
const component_factory_1 = require("./component-factory");
class ComponentManager {
    constructor(vue, container) {
        this._registrations = new Array();
        n_defensive_1.given(vue, "vue").ensureHasValue();
        n_defensive_1.given(container, "container").ensureHasValue();
        this._vue = vue;
        this._container = container;
    }
    registerComponents(...componentViewModelClasses) {
        for (let item of componentViewModelClasses)
            this.registerComponent(item);
    }
    bootstrap() {
        let componentFactory = new component_factory_1.ComponentFactory();
        for (let registration of this._registrations)
            this._vue.component(registration.element, componentFactory.create(registration));
    }
    registerComponent(componentViewModelClass) {
        let registration = new component_registration_1.ComponentRegistration(componentViewModelClass);
        if (this._registrations.some(t => t.name === registration.name))
            throw new n_exception_1.ApplicationException(`Duplicate Component registration with name '${registration.name}'.`);
        if (this._registrations.some(t => t.element === registration.element))
            throw new n_exception_1.ApplicationException(`Duplicate Component registration with element '${registration.element}'`);
        this._registrations.push(registration);
        this._container.registerTransient(registration.name, registration.viewModel);
    }
}
exports.ComponentManager = ComponentManager;
//# sourceMappingURL=component-manager.js.map