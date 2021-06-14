"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentFactory = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const utilities_1 = require("./utilities");
require("@nivinjoseph/n-ext");
const n_exception_1 = require("@nivinjoseph/n-exception");
class ComponentFactory {
    create(registration) {
        n_defensive_1.given(registration, "registration").ensureHasValue();
        const component = {};
        // component.template = registration.template;
        // component.render = (<any>registration.viewModel).___render;
        // component.staticRenderFns = (<any>registration.viewModel).___staticRenderFns;
        if (typeof registration.template === "string") {
            component.template = registration.template;
        }
        else {
            component.render = registration.template.render;
            component.staticRenderFns = registration.template.staticRenderFns;
        }
        if (registration.bindings.length > 0)
            component.props = registration.bindings;
        component.inject = ["pageScopeContainer", "rootScopeContainer"];
        component.data = function () {
            let vueVm = this;
            // console.log("INVOKED component");
            const container = vueVm.pageScopeContainer || vueVm.rootScopeContainer;
            if (!container)
                throw new n_exception_1.ApplicationException("Could not get pageScopeContainer or rootScopeContainer.");
            if (component.___reload) {
                const c = container;
                const cReg = c.componentRegistry.find(registration.name);
                cReg._component = component.___viewModel;
                cReg._dependencies = cReg.getDependencies();
                // registration.reload(component.___viewModel);
                component.___reload = false;
            }
            let vm = container.resolve(registration.name);
            let data = { vm: vm };
            let methods = {};
            let computed = {};
            let propertyInfos = utilities_1.Utilities.getPropertyInfos(vm);
            for (let info of propertyInfos) {
                if (typeof (info.descriptor.value) === "function")
                    methods[info.name] = info.descriptor.value.bind(vm);
                else if (info.descriptor.get || info.descriptor.set) {
                    computed[info.name] = {
                        get: info.descriptor.get ? info.descriptor.get.bind(vm) : undefined,
                        set: info.descriptor.set ? info.descriptor.set.bind(vm) : undefined
                    };
                }
            }
            vueVm.$options.methods = methods;
            vueVm.$options.computed = computed;
            vm._ctx = vueVm;
            vm._bindings = component.props ? [...registration.bindings] : [];
            vm._events = registration.events;
            return data;
        };
        component.beforeCreate = function () {
            // console.log("executing beforeCreate");
            // console.log(this.vm);
        };
        component.created = function () {
            // console.log("executing created");
            // console.log(this.vm);
            if (this.vm.onCreate)
                this.vm.onCreate();
        };
        component.beforeMount = function () {
            // console.log("executing beforeMount");
            // console.log(this.vm);
        };
        component.mounted = function () {
            // console.log("executing mounted");
            // console.log(this.vm);
            if (this.vm.onMount)
                this.vm.onMount(this.$el);
        };
        component.beforeUpdate = function () {
            // console.log("executing beforeUpdate");
            // console.log(this.vm);
        };
        component.updated = function () {
            // console.log("executing updated");
            // console.log(this.vm);
        };
        component.beforeDestroy = function () {
            // console.log("executing beforeDestroy");
            // console.log(this.vm);
        };
        component.destroyed = function () {
            // console.log("executing destroyed");
            // console.log(this.vm);
            if (this.vm.onDestroy)
                this.vm.onDestroy();
        };
        return component;
    }
}
exports.ComponentFactory = ComponentFactory;
//# sourceMappingURL=component-factory.js.map