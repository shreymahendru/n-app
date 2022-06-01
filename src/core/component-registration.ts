import { given } from "@nivinjoseph/n-defensive";
import { ViewModelRegistration } from "./view-model-registration";
import { elementSymbol } from "./element";
import { ApplicationException } from "@nivinjoseph/n-exception";
import { bindSymbol } from "./bind";
import { eventsSymbol } from "./events";


export class ComponentRegistration extends ViewModelRegistration
{
    private readonly _element: string;
    private readonly _bindings = new Array<ComponentBindingInfo>();
    private readonly _bindingSchema: object = {};
    private readonly _hasModel: boolean;
    private readonly _events = new Array<string>();
    
    
    public get element(): string { return this._element; }
    public get bindings(): Array<ComponentBindingInfo> { return this._bindings; }
    public get bindingSchema(): object { return this._bindingSchema; }
    public get hasModel(): boolean { return this._hasModel; }
    public get events(): Array<string> { return this._events; }
    
    
    public constructor(component: Function)
    {
        given(component, "component").ensureHasValue();
        
        super(component);
        
        if (!Reflect.hasOwnMetadata(elementSymbol, this.viewModel))
            throw new ApplicationException(`ComponentViewModel '${this.name}' does not have @element applied.`);

        this._element = Reflect.getOwnMetadata(elementSymbol, this.viewModel);
        
        if (Reflect.hasOwnMetadata(bindSymbol, this.viewModel))
        {
            const bindingSchema: Record<string, any> = Reflect.getOwnMetadata(bindSymbol, this.viewModel);
            Object.keys(bindingSchema).forEach(key =>
            {
                let name = key.trim();
                let isOptional = false;
                if (name.endsWith("?"))
                {
                    name = name.substring(0, name.length - 1);
                    isOptional = true;
                }
                this._bindings.push({
                    name,
                    isOptional,
                    type: bindingSchema[key]
                });
            });
            
            this._bindingSchema = bindingSchema;
        }
        
        this._hasModel = this._bindings.some(t => t.name === "value");
        
        if (Reflect.hasOwnMetadata(eventsSymbol, this.viewModel))
            this._events.push(...Reflect.getOwnMetadata(eventsSymbol, this.viewModel));
    }
    
    
    // public reload(component: Function): void
    // {
    //     given(component, "component").ensureHasValue();

    //     super.reload(component);

    //     this._bindings = new Array<string>();

    //     if (!Reflect.hasOwnMetadata(elementSymbol, this.viewModel))
    //         throw new ApplicationException(`ComponentViewModel '${this.name}' does not have @element applied.`);

    //     this._element = Reflect.getOwnMetadata(elementSymbol, this.viewModel);

    //     if (Reflect.hasOwnMetadata(bindSymbol, this.viewModel))
    //         this._bindings.push(...Reflect.getOwnMetadata(bindSymbol, this.viewModel));

    //     this._hasModel = this._bindings.some(t => t === "value");
    // }
}

export interface ComponentBindingInfo
{
    name: string;
    isOptional: boolean;
    type: any;
}