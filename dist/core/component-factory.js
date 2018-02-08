"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("n-defensive");
const utilities_1 = require("./utilities");
class ComponentFactory {
    constructor(container) {
        n_defensive_1.given(container, "container").ensureHasValue();
        this._container = container;
    }
    create(registration) {
        n_defensive_1.given(registration, "registration").ensureHasValue();
        let component = {};
        component.template = registration.template || registration.templateId;
        const container = this._container;
        component.data = function () {
            let vueVm = this;
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
            return data;
        };
        let componentRegistration = registration;
        if (componentRegistration.bindings && componentRegistration.bindings.length > 0)
            component.props = componentRegistration.bindings;
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