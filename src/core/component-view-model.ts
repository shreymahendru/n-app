import { given } from "@nivinjoseph/n-defensive";
import { InvalidOperationException } from "@nivinjoseph/n-exception";
import { BaseViewModel } from "./base-view-model";
import { ComponentRegistration } from "./component-registration";
import { ComponentFactory } from "./component-factory";


// public
export class ComponentViewModel extends BaseViewModel
{    
    private get bindings(): ReadonlyArray<string> { return (<any>this)["_bindings"]; }
    
    
    protected getBound<T>(propertyName: string): T
    {
        if (!this.ctx)
            throw new InvalidOperationException("calling getBound() in the constructor");
        
        given(propertyName, "propertyName").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace())
            .ensure(t => this.bindings.some(u => u === t), `No binding with the name '${propertyName}' found`);
        
        return this.ctx[propertyName] as T;
    }
    
    protected getBoundModel<T>(): T
    {
        if (!this.ctx)
            throw new InvalidOperationException("calling getBoundModel() in the constructor");
        
        if (!this.bindings.some(t => t === "value"))
            throw new InvalidOperationException("calling getBoundModel() without defining 'value' in bind");
        
        return this.ctx["value"] as T;
    }
    
    protected setBoundModel(value: any): void
    {
        if (!this.ctx)
            throw new InvalidOperationException("calling setBoundModel() in the constructor");

        if (!this.bindings.some(t => t === "value"))
            throw new InvalidOperationException("calling setBoundModel() without defining 'value' in bind");
        
        this.ctx.$emit("input", value);
    }
    
    public static createComponentOptions(component: Function): object
    {
        given(component, "component").ensureHasValue().ensureIsFunction();
        
        const registration = new ComponentRegistration(component);
        const factory = new ComponentFactory();
        return factory.create(registration);
    }
}