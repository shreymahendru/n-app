import { given } from "@nivinjoseph/n-defensive";
import { InvalidOperationException } from "@nivinjoseph/n-exception";
import { BaseViewModel } from "./base-view-model";
import { ComponentRegistration } from "./component-registration";
import { ComponentFactory } from "./component-factory";


// public
export class ComponentViewModel extends BaseViewModel
{    
    private get _myBindings(): ReadonlyArray<string> { return (<any>this)["_bindings"]; }
    private get _myEvents(): ReadonlyArray<string> { return (<any>this)["_events"]; }
    
    
    protected getBound<T>(propertyName: string): T
    {
        if (!this.ctx)
            throw new InvalidOperationException("calling getBound() in the constructor");
        
        given(propertyName, "propertyName").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace())
            .ensure(t => this._myBindings.some(u => u === t), `No binding with the name '${propertyName}' found`);
        
        return this.ctx[propertyName] as T;
    }
    
    protected getBoundModel<T>(): T
    {
        if (!this.ctx)
            throw new InvalidOperationException("calling getBoundModel() in the constructor");
        
        if (!this._myBindings.some(t => t === "value"))
            throw new InvalidOperationException("calling getBoundModel() without defining 'value' in bind");
        
        return this.ctx["value"] as T;
    }
    
    protected setBoundModel(value: any): void
    {
        if (!this.ctx)
            throw new InvalidOperationException("calling setBoundModel() in the constructor");

        if (!this._myBindings.some(t => t === "value"))
            throw new InvalidOperationException("calling setBoundModel() without defining 'value' in bind");
        
        this.ctx.$emit("input", value);
    }
    
    protected emit(event: string, ...eventArgs: any[]): void
    {
        given(event, "event").ensureHasValue().ensureIsString()
            .ensure(t => this._myEvents.contains(t.trim()), "undeclared event");
        
        event = this._camelCaseToKebabCase(event);
        
        this.ctx.$emit(event, ...eventArgs);
    }
    
    public static createComponentOptions(component: Function): object
    {
        given(component, "component").ensureHasValue().ensureIsFunction();
        
        const registration = new ComponentRegistration(component);
        const factory = new ComponentFactory();
        return factory.create(registration);
    }
    
    private _camelCaseToKebabCase(value: string): string
    {
        let eventName = value.trim();
        const re = /[A-Z]/g;

        let index = eventName.search(re);
        while (index !== -1)
        {
            const char = eventName[index];
            const replacement = "-" + char.toLowerCase();
            eventName = eventName.replace(char, replacement);

            index = eventName.search(re);
        }

        return eventName;
    }
    
    // Shrey implementation
    // private camelToKebab(value: string): string
    // {
    //     given(value, "value").ensureHasValue().ensure(t => t.isNotEmptyOrWhiteSpace())
    //         .ensure(t => t.trim()[0].toUpperCase() !== t.trim()[0])
    //         .ensure(t => !t.contains(" "));
        
    //     return value.trim().split("").reduce((acc, t) =>
    //     {
    //         if (t.toUpperCase() === t)
    //         {
    //             acc = acc + "-" + t.toLowerCase();
    //         }
    //         else
    //         {
    //             acc += t;
    //         }
    //         return acc;
    //     }, "");
    // }
}