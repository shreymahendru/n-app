import { given } from "n-defensive";
import { Container } from "n-ject";
import { Utils } from "./utils";
import { ViewModelRegistration } from "./view-model-registration";
import { ComponentRegistration } from "./component-registration";


export class ComponentFactory
{
    private readonly _container: Container;
    
    
    public constructor(container: Container)
    {
        given(container, "container").ensureHasValue();
        this._container = container;
    }
    
    
    public create(registration: ViewModelRegistration): Object
    {
        given(registration, "registration").ensureHasValue();
        
        let component: any = {};
        
        component.template = registration.templateId;
        
        const container = this._container;
        component.data = function ()
        {
            let vueVm = this;
            let vm = container.resolve<any>(registration.name);
            let data = { vm: vm };
            let methods: { [index: string]: any } = {};
            let computed: { [index: string]: any } = {};

            let propertyInfos = Utils.getPropertyInfos(vm);
            for (let info of propertyInfos)
            {
                if (typeof (info.descriptor.value) === "function")
                    methods[info.name] = info.descriptor.value.bind(vm);
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

            return data;
        };
        
        let componentRegistration = registration as ComponentRegistration;
        if (componentRegistration.bindings && componentRegistration.bindings.length > 0)
            component.props = componentRegistration.bindings;    
        
        component.beforeCreate = function ()
        {
            // console.log("executing beforeCreate");
            // console.log(this.vm);
        };
        
        component.created = function ()
        {
            // console.log("executing created");
            // console.log(this.vm);
            
            if (this.vm.onCreate)
                this.vm.onCreate();    
        };
        
        component.beforeMount = function ()
        {
            // console.log("executing beforeMount");
            // console.log(this.vm);
        };
        
        component.mounted = function ()
        {
            // console.log("executing mounted");
            // console.log(this.vm);
            
            if (this.vm.onMount)
                this.vm.onMount(this.$el);    
        };
        
        component.beforeUpdate = function ()
        {
            // console.log("executing beforeUpdate");
            // console.log(this.vm);
        };
        
        component.updated = function ()
        {
            // console.log("executing updated");
            // console.log(this.vm);
        };
        
        component.beforeDestroy = function ()
        {
            // console.log("executing beforeDestroy");
            // console.log(this.vm);
        };
        
        component.destroyed = function ()
        {
            // console.log("executing destroyed");
            // console.log(this.vm);
            
            if (this.vm.onDestroy)
                this.vm.onDestroy(); 
        };
        
        return component;
    }
}