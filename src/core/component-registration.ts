import { given } from "@nivinjoseph/n-defensive";
import { ViewModelRegistration } from "./view-model-registration";
import { elementSymbol } from "./element";
import { ApplicationException } from "@nivinjoseph/n-exception";
import { bindSymbol } from "./bind";


export class ComponentRegistration extends ViewModelRegistration
{
    private readonly _element: string;
    private readonly _bindings: Array<string>;
    private readonly _hasModel: boolean;
    
    
    public get element(): string { return this._element; }
    public get bindings(): Array<string> { return this._bindings; }
    public get hasModel(): boolean { return this._hasModel; }
    
    
    public constructor(component: Function)
    {
        given(component, "component").ensureHasValue();
        
        super(component);
        
        this._bindings = new Array<string>();
        
        if (!Reflect.hasOwnMetadata(elementSymbol, this.viewModel))
            throw new ApplicationException(`ComponentViewModel '${this.name}' does not have @element applied.`);

        this._element = Reflect.getOwnMetadata(elementSymbol, this.viewModel);
        
        if (Reflect.hasOwnMetadata(bindSymbol, this.viewModel))
            this._bindings.push(...Reflect.getOwnMetadata(bindSymbol, this.viewModel));   
        
        this._hasModel = this._bindings.some(t => t === "value");
    }
}