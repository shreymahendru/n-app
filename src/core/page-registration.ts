import { given } from "@nivinjoseph/n-defensive";
import { ViewModelRegistration } from "./view-model-registration";
import { appRouteSymbol } from "./route";
import { ApplicationException } from "@nivinjoseph/n-exception";
import { RouteInfo } from "./route-info"; 


export class PageRegistration extends ViewModelRegistration
{
    private readonly _route: RouteInfo;
    
    
    public get route(): RouteInfo { return this._route; }
    
    
    public constructor(page: Function)
    {
        given(page, "page").ensureHasValue();
        
        super(page);

        if (!Reflect.hasOwnMetadata(appRouteSymbol, this.viewModel))
            throw new ApplicationException(`PageViewModel '${this.name}' does not have @route applied.`);

        this._route = new RouteInfo(Reflect.getOwnMetadata(appRouteSymbol, this.viewModel));
    }
}