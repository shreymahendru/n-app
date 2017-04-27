import { given } from "n-defensive";
import { ViewModelRegistration } from "./view-model-registration";
import { elementSymbol } from "./element";
import { ApplicationException } from "n-exception";


export class ComponentRegistration extends ViewModelRegistration
{
    private readonly _element: string;
    
    
    public get element(): string { return this._element; }
    
    
    public constructor(component: Function)
    {
        given(component, "component").ensureHasValue();
        
        super(component);
        
        if (!Reflect.hasOwnMetadata(elementSymbol, this.viewModel))
            throw new ApplicationException(`ComponentViewModel '${this.name}' does not have @element applied.`);

        this._element = Reflect.getOwnMetadata(elementSymbol, this.viewModel);
    }
}