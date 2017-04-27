import { given } from "n-defensive";
import { Container } from "n-ject";
import { ComponentRegistration } from "./component-registration";
import { ApplicationException } from "n-exception";
import { Utils } from "./utils";


export class ComponentManager
{
    private readonly _vue: any;
    private readonly _container: Container;
    private readonly _registrations = new Array<ComponentRegistration>();
    
    
    public constructor(vue: any, container: Container)
    {
        given(vue, "vue").ensureHasValue();
        given(container, "container").ensureHasValue();
        this._vue = vue;
        this._container = container;
    }
    
    
    public registerComponents(...componentViewModelClasses: Function[]): void
    {
        for (let item of componentViewModelClasses)
            this.registerComponent(item);    
    }
    
    public bootstrap(): void
    {
        for (let item of this._registrations)
            this.bootstrapComponent(item);   
    }
    
    
    private registerComponent(componentViewModelClass: Function): void
    {
        let registration = new ComponentRegistration(componentViewModelClass);
        
        if (this._registrations.some(t => t.name === registration.name))
            throw new ApplicationException(`Duplicate Component registration with name '${registration.name}'.`);
        
        if (this._registrations.some(t => t.element === registration.element))
            throw new ApplicationException(`Duplicate Component registration with element '${registration.element}'`);
        
        this._registrations.push(registration);
        this._container.registerTransient(registration.name, registration.viewModel);
    }
    
    private bootstrapComponent(registration: ComponentRegistration): void
    {
        const container = this._container;
        
        this._vue.component(registration.element, {
            template: registration.templateId,
            data: function ()
            {
                let vueVm = this;
                let vm = container.resolve(registration.name);
                let data = { vm: vm };
                let methods: {[index: string]: any} = {};
                let computed: {[index: string]: any} = {};

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

                return data;
            }
        });
    }
}