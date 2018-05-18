import { given } from "@nivinjoseph/n-defensive";
import { ViewModelRegistration } from "./view-model-registration";
import { appRouteSymbol } from "./route";
import { ApplicationException } from "@nivinjoseph/n-exception";
import { RouteInfo } from "./route-info";
import { titleSymbol } from "./title";
import { metaSymbol } from "./meta";


export class PageRegistration extends ViewModelRegistration
{
    private readonly _route: RouteInfo;
    private readonly _redirect: string;
    private readonly _title: string;
    private readonly _metadata: object;


    public get route(): RouteInfo { return this._route; }
    public get redirect(): string { return this._redirect; }
    public get title(): string { return this._title; }
    public get metadata(): object { return this._metadata; }


    public constructor(page: Function, defaultPageTitle: string, defaultPageMetas: Array<{ name: string; content: string; }>)
    {
        given(page, "page").ensureHasValue().ensureIsFunction();
        given(defaultPageTitle, "defaultPageTitle").ensureIsString();
        given(defaultPageMetas, "defaultPageMetas").ensureIsArray();

        super(page);

        if (!Reflect.hasOwnMetadata(appRouteSymbol, this.viewModel))
            throw new ApplicationException(`PageViewModel '${this.name}' does not have @route applied.`);

        const routeData = Reflect.getOwnMetadata(appRouteSymbol, this.viewModel);

        this._route = new RouteInfo(routeData.route);
        this._redirect = routeData.redirect;

        let title = defaultPageTitle || null;
        if (Reflect.hasOwnMetadata(titleSymbol, this.viewModel))
            title = Reflect.getOwnMetadata(titleSymbol, this.viewModel);

        this._title = title;


        const metas = defaultPageMetas || [];
        if (Reflect.hasOwnMetadata(metaSymbol, this.viewModel))
            metas.push(...Reflect.getOwnMetadata(metaSymbol, this.viewModel));

        this._metadata = metas
            .reduce((acc: any, t) =>
            {
                acc[t.name] = t.content;
                return acc;
            }, {});
    }
}