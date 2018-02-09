import { given } from "@nivinjoseph/n-defensive";
import { Container } from "@nivinjoseph/n-ject";
import { ComponentRegistration } from "./component-registration";
import { ApplicationException } from "@nivinjoseph/n-exception";
import { ComponentFactory } from "./component-factory";


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
        let componentFactory = new ComponentFactory(this._container);
        
        for (let registration of this._registrations)
            this._vue.component(registration.element, componentFactory.create(registration));
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
}