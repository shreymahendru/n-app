import { given } from "@nivinjoseph/n-defensive";
import { ViewModelRegistration } from "./view-model-registration";
import { appRouteSymbol } from "./route";
import { ApplicationException } from "@nivinjoseph/n-exception";
import { RouteInfo } from "./route-info"; 


export class PageRegistration extends ViewModelRegistration
{
    private readonly _route: RouteInfo;
    private readonly _redirect: string;
    
    
    public get route(): RouteInfo { return this._route; }
    public get redirect(): string { return this._redirect; }
    
    
    public constructor(page: Function)
    {
        given(page, "page").ensureHasValue();
        
        super(page);

        if (!Reflect.hasOwnMetadata(appRouteSymbol, this.viewModel))
            throw new ApplicationException(`PageViewModel '${this.name}' does not have @route applied.`);

        const routeData = Reflect.getOwnMetadata(appRouteSymbol, this.viewModel);
        
        this._route = new RouteInfo(routeData.route);
        this._redirect = routeData.redirect;
    }
}