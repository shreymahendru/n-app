import { given } from "@nivinjoseph/n-defensive";
import { Container, Scope } from "@nivinjoseph/n-ject";
import { Utilities } from "./utilities";
import { ComponentRegistration } from "./component-registration";
import "@nivinjoseph/n-ext";
import { ApplicationException } from "@nivinjoseph/n-exception";


export class ComponentFactory
{
    public create(registration: ComponentRegistration): Object
    {
        given(registration, "registration").ensureHasValue();
        
        const component: any = {};
        
        // component.template = registration.template;
        
        // component.render = (<any>registration.viewModel).___render;
        // component.staticRenderFns = (<any>registration.viewModel).___staticRenderFns;
        
        if (typeof registration.template === "string")
        {
            component.template = registration.template;
        }
        else
        {
            component.render = registration.template.render;
            component.staticRenderFns = registration.template.staticRenderFns;
        }
        
        if (registration.bindings.length > 0)
            component.props = registration.bindings;
        
        component.inject = ["pageScopeContainer", "rootScopeContainer"];
        
        component.data = function (): { vm: any; }
        {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const vueVm = this;
            
            // console.log("INVOKED component");
            
            const container: Scope | null = vueVm.pageScopeContainer || vueVm.rootScopeContainer;
            if (!container)
                throw new ApplicationException("Could not get pageScopeContainer or rootScopeContainer.");
            
            if (component.___reload)
            {
                const c = container as Container;
                // @ts-expect-error: deliberately accessing protected member
                const cReg = c.componentRegistry.find(registration.name)!;
                (<any>cReg)._component = component.___viewModel;
                // @ts-expect-error: deliberate calling private method
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                (<any>cReg)._dependencies = cReg._getDependencies();
                // registration.reload(component.___viewModel);
                
                component.___reload = false;
            }
            
            const vm = container.resolve<any>(registration.name);
            
            const data = { vm: vm };
            const methods: { [index: string]: any; } = {};
            const computed: { [index: string]: any; } = {};

            const propertyInfos = Utilities.getPropertyInfos(vm);
            for (const info of propertyInfos)
            {
                if (typeof info.descriptor.value === "function")
                    methods[info.name] = (info.descriptor.value as Function).bind(vm);
                else if (info.descriptor.get || info.descriptor.set)
                {
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
        
        
        component.beforeCreate = function (): void
        {
            // console.log("executing beforeCreate");
            // console.log(this.vm);
        };
        
        component.created = function (): void
        {
            // console.log("executing created");
            // console.log(this.vm);
            
            if (this.vm.onCreate)
            {
                if (registration.persist && registration.isCreated)
                {
                    // no op
                }
                else
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    this.vm.onCreate();
            }

            registration.created();
        };
        
        component.beforeMount = function (): void
        {
            // console.log("executing beforeMount");
            // console.log(this.vm);
        };
        
        component.mounted = function (): void
        {
            // console.log("executing mounted");
            // console.log(this.vm);
            
            if (this.vm.onMount)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                this.vm.onMount(this.$el);    
        };
        
        component.beforeUpdate = function (): void
        {
            // console.log("executing beforeUpdate");
            // console.log(this.vm);
        };
        
        component.updated = function (): void
        {
            // console.log("executing updated");
            // console.log(this.vm);
        };
        
        component.beforeDestroy = function (): void
        {
            // console.log("executing beforeDestroy");
            // console.log(this.vm);
            
            if (this.vm.onDismount)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                this.vm.onDismount();
        };
        
        component.destroyed = function (): void
        {
            // console.log("executing destroyed");
            // console.log(this.vm);
            
            if (this.vm.onDestroy && !registration.persist)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                this.vm.onDestroy(); 
            
            this.vm._ctx.$options.methods = null;
            this.vm._ctx.$options.computed = null;
            // this.vm._ctx = null;
            this.vm = null;
        };
        
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return component;
    }
}