import { ComponentFactory } from "./component-factory";
import { Utils } from "./utils";
import { PageRegistration } from "./page-registration";


export class PageComponentFactory extends ComponentFactory
{
    public create(registration: PageRegistration): Object
    {
        let component: any = super.create(registration);
        
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
        
        component.beforeRouteEnter = function (to: any, from: any, next: any)
        {
            // called before the route that renders this component is confirmed.
            // does NOT have access to `this` component instance,
            // because it has not been created yet when this guard is called!
            
            let routeArgs: Array<any> = [];
            
            if (registration.route.params.length > 0)
            {
                try 
                {
                    routeArgs = Utils.createRouteArgs(registration.route, to);
                }
                catch (error)
                {
                    console.log(error);
                    next(false);
                    return;
                }
            }  
            
            next((vueModel: any) =>
            {
                let vm = vueModel.vm;
                if (vm.onEnter)
                    vm.onEnter(...routeArgs);
            });
        };
        
        component.beforeRouteUpdate = function (to: any, from: any, next: any)
        {
            // called when the route that renders this component has changed,
            // but this component is reused in the new route.
            // For example, for a route with dynamic params /foo/:id, when we
            // navigate between /foo/1 and /foo/2, the same Foo component instance
            // will be reused, and this hook will be called when that happens.
            // has access to `this` component instance.

            
            if (registration.route.params.length === 0)
            {
                next();
                return;
            }    
            
            let routeArgs: Array<any> = [];
            try 
            {
                routeArgs = Utils.createRouteArgs(registration.route, to);
            }
            catch (error)
            {
                console.log(error);
                next(false);
                return;
            }
            
            let fromRouteArgs: Array<any> = [];
            try 
            {
                fromRouteArgs = Utils.createRouteArgs(registration.route, from);
            }
            catch (error) 
            {
                console.log(error);
                fromRouteArgs = [];
            }

            if (routeArgs.equals(fromRouteArgs))
            {
                next();
                return;
            }   
            
            let vm = this.vm;
            if (vm.onLeave)
                vm.onLeave();    
            
            if (vm.onEnter)
                vm.onEnter(...routeArgs);
            
            next();
        };
        
        component.beforeRouteLeave = function (to: any, from: any, next: any)
        {
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