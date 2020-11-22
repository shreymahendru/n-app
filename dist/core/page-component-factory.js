"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageComponentFactory = void 0;
const route_args_1 = require("./route-args");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const utilities_1 = require("./utilities");
const n_exception_1 = require("@nivinjoseph/n-exception");
const $ = require("jquery");
const page_hmr_helper_1 = require("./page-hmr-helper");
class PageComponentFactory {
    create(registration) {
        n_defensive_1.given(registration, "registration").ensureHasValue();
        const component = {};
        if (typeof registration.template === "string") {
            component.template = registration.template;
        }
        else {
            component.render = registration.template.render;
            component.staticRenderFns = registration.template.staticRenderFns;
        }
        component.inject = ["rootScopeContainer"];
        component.data = function () {
            let vueVm = this;
            let container = vueVm.rootScopeContainer;
            if (!container)
                throw new n_exception_1.ApplicationException("Could not get rootScopeContainer.");
            if (component.___reload) {
                const c = container;
                const cReg = c.componentRegistry.find(registration.name);
                cReg._component = component.___viewModel;
                cReg._dependencies = cReg.getDependencies();
            }
            container = container.createScope();
            let vm = container.resolve(registration.name);
            let data = {
                vm: vm,
                pageScopeContainer: container
            };
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
        component.provide = function () {
            return {
                pageScopeContainer: this.pageScopeContainer
            };
        };
        component.beforeCreate = function () {
        };
        const setDocumentMetadata = () => {
            if (registration.title)
                window.document.title = registration.title;
            if (registration.metadata) {
                registration.metadata.forEach((metadata) => {
                    $(`meta[${metadata.$key}="${metadata[metadata.$key]}"]`).remove();
                    $("head").append(`<meta ${Object.keys(metadata).where(t => t !== "$key").map(t => `${t}="${metadata[t]}"`).join(" ")}>`);
                });
            }
        };
        component.created = function () {
            if (this.vm.onCreate)
                this.vm.onCreate();
            if (component.___reload) {
                component.___reload = false;
                setDocumentMetadata();
                const routeArgs = page_hmr_helper_1.PageHmrHelper.restore(registration);
                this.vm.__routeArgs = routeArgs;
                if (this.vm.onEnter)
                    routeArgs.routeArgs.length > 0 ? this.vm.onEnter(...routeArgs.routeArgs, ...(registration.resolvedValues ? registration.resolvedValues : [])) : this.vm.onEnter();
            }
        };
        component.beforeMount = function () {
        };
        component.mounted = function () {
            if (this.vm.onMount)
                this.vm.onMount(this.$el);
        };
        component.beforeUpdate = function () {
        };
        component.updated = function () {
        };
        component.beforeDestroy = function () {
        };
        component.destroyed = function () {
            if (this.vm.onDestroy)
                this.vm.onDestroy();
        };
        component.beforeRouteEnter = function (to, from, next) {
            let routeArgs = null;
            try {
                routeArgs = route_args_1.RouteArgs.create(registration.route, to);
            }
            catch (error) {
                console.error(error);
                next(false);
                return;
            }
            setDocumentMetadata();
            next((vueModel) => {
                setDocumentMetadata();
                let vm = vueModel.vm;
                vm.__routeArgs = routeArgs;
                if (module.hot)
                    page_hmr_helper_1.PageHmrHelper.track(registration, routeArgs);
                if (vm.onEnter)
                    routeArgs.routeArgs.length > 0 ? vm.onEnter(...routeArgs.routeArgs, ...(registration.resolvedValues ? registration.resolvedValues : [])) : vm.onEnter();
            });
        };
        component.beforeRouteUpdate = function (to, from, next) {
            let routeArgs = null;
            try {
                routeArgs = route_args_1.RouteArgs.create(registration.route, to);
            }
            catch (error) {
                console.error(error);
                next(false);
                return;
            }
            let fromRouteArgs = null;
            try {
                fromRouteArgs = route_args_1.RouteArgs.create(registration.route, from);
            }
            catch (error) {
                console.error(error);
                fromRouteArgs = new route_args_1.RouteArgs({}, {}, []);
            }
            if (routeArgs.equals(fromRouteArgs)) {
                setDocumentMetadata();
                next();
                return;
            }
            let vm = this.vm;
            if (vm.onLeave) {
                try {
                    vm.onLeave();
                }
                catch (error) {
                    next(false);
                    return;
                }
            }
            vm.__routeArgs = routeArgs;
            if (module.hot)
                page_hmr_helper_1.PageHmrHelper.track(registration, routeArgs);
            if (vm.onEnter)
                routeArgs.routeArgs.length > 0 ? vm.onEnter(...routeArgs.routeArgs, ...(registration.resolvedValues ? registration.resolvedValues : [])) : vm.onEnter();
            setDocumentMetadata();
            next();
        };
        component.beforeRouteLeave = function (to, from, next) {
            let vm = this.vm;
            if (vm.onLeave) {
                try {
                    vm.onLeave();
                }
                catch (error) {
                    next(false);
                    return;
                }
            }
            next();
        };
        return component;
    }
}
exports.PageComponentFactory = PageComponentFactory;
//# sourceMappingURL=page-component-factory.js.map