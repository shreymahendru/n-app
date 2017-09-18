"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_factory_1 = require("./component-factory");
const route_args_1 = require("./route-args");
class PageComponentFactory extends component_factory_1.ComponentFactory {
    create(registration) {
        let component = super.create(registration);
        /* The Full Navigation Resolution Flow
                Navigation triggered
                Call leave guards in deactivated components
                Call global beforeEach guards
                Call beforeRouteUpdate guards in reused components (2.2+)
                Call beforeEnter in route configs
                Resolve async route components
                Call beforeRouteEnter in activated components
                Call global beforeResolve guards (2.5+)
                Navigation confirmed.
                Call global afterEach hooks.
                DOM updates triggered.
                Call callbacks passed to next in beforeRouteEnter guards with instantiated instances.
         */
        component.beforeRouteEnter = function (to, from, next) {
            // called before the route that renders this component is confirmed.
            // does NOT have access to `this` component instance,
            // because it has not been created yet when this guard is called!
            let routeArgs = null;
            try {
                routeArgs = route_args_1.RouteArgs.create(registration.route, to);
            }
            catch (error) {
                console.log(error);
                next(false);
                return;
            }
            next((vueModel) => {
                let vm = vueModel.vm;
                vm.__routeArgs = routeArgs;
                if (vm.onEnter)
                    routeArgs.routeArgs.length > 0 ? vm.onEnter(...routeArgs.routeArgs) : vm.onEnter();
            });
        };
        component.beforeRouteUpdate = function (to, from, next) {
            // called when the route that renders this component has changed,
            // but this component is reused in the new route.
            // For example, for a route with dynamic params /foo/:id, when we
            // navigate between /foo/1 and /foo/2, the same Foo component instance
            // will be reused, and this hook will be called when that happens.
            // has access to `this` component instance.
            // if (registration.route.params.length === 0)
            // {
            //     next();
            //     return;
            // }    
            let routeArgs = null;
            try {
                routeArgs = route_args_1.RouteArgs.create(registration.route, to);
            }
            catch (error) {
                console.log(error);
                next(false);
                return;
            }
            let fromRouteArgs = null;
            try {
                fromRouteArgs = route_args_1.RouteArgs.create(registration.route, from);
            }
            catch (error) {
                console.log(error);
                fromRouteArgs = new route_args_1.RouteArgs({}, {}, []);
            }
            if (routeArgs.equals(fromRouteArgs)) {
                next();
                return;
            }
            let vm = this.vm;
            if (vm.onLeave)
                vm.onLeave();
            vm.__routeArgs = routeArgs;
            if (vm.onEnter)
                routeArgs.routeArgs.length > 0 ? vm.onEnter(...routeArgs.routeArgs) : vm.onEnter();
            next();
        };
        component.beforeRouteLeave = function (to, from, next) {
            // called when the route that renders this component is about to
            // be navigated away from.
            // has access to `this` component instance.
            let vm = this.vm;
            if (vm.onLeave)
                vm.onLeave();
            next();
        };
        return component;
    }
}
exports.PageComponentFactory = PageComponentFactory;
//# sourceMappingURL=page-component-factory.js.map