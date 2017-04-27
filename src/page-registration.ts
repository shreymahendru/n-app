import { given } from "n-defensive";
import { ViewModelRegistration } from "./view-model-registration";
import { appRouteSymbol } from "./route";
import { ApplicationException } from "n-exception";


export class PageRegistration extends ViewModelRegistration
{
    private readonly _route: string;
    
    
    public get route(): string { return this._route; }
    
    
    public constructor(page: Function)
    {
        given(page, "page").ensureHasValue();
        
        super(page);

        if (!Reflect.hasOwnMetadata(appRouteSymbol, this.viewModel))
            throw new ApplicationException(`PageViewModel '${this.name}' does not have @route applied.`);

        this._route = Reflect.getOwnMetadata(appRouteSymbol, this.viewModel);
    }
}