import { given } from "@nivinjoseph/n-defensive";
import { ViewModelRegistration } from "./view-model-registration";
import { appRouteSymbol } from "./route";
import { ApplicationException } from "@nivinjoseph/n-exception";
import { RouteInfo } from "./route-info";
import { titleSymbol } from "./title";
import { metaSymbol, MetaDetail } from "./meta";
// import { authorizeSymbol } from "./authorize";
import { resolveSymbol } from "./resolve";
import { pagesSymbol } from "./pages";


export class PageRegistration extends ViewModelRegistration
{
    private readonly _route: RouteInfo;
    private readonly _redirect: string;
    private readonly _title: string;
    private readonly _metadata: ReadonlyArray<MetaDetail>;
    private readonly _resolvers: ReadonlyArray<any>;
    private readonly _pages: ReadonlyArray<Function>;
    
    private _resolvedValues: ReadonlyArray<any>;


    public get route(): RouteInfo { return this._route; }
    public get redirect(): string { return this._redirect; }
    public get title(): string { return this._title; }
    public get metadata(): ReadonlyArray<MetaDetail> { return this._metadata; }
    public get resolvers(): ReadonlyArray<any> { return this._resolvers; }
    public get pages(): ReadonlyArray<Function> { return this._pages; }
    
    public get resolvedValues(): ReadonlyArray<any> { return this._resolvedValues; }
    public set resolvedValues(value: ReadonlyArray<any>) { this._resolvedValues = value; }
    

    public constructor(page: Function, defaultPageTitle: string, defaultPageMetas: ReadonlyArray<MetaDetail>)
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

        const metas: Array<MetaDetail> = defaultPageMetas ? [...defaultPageMetas] : [];
        if (Reflect.hasOwnMetadata(metaSymbol, this.viewModel))
            metas.push(...Reflect.getOwnMetadata(metaSymbol, this.viewModel));

        // this._metadata = metas
        //     .reduce((acc: any, t) =>
        //     {
        //         acc[t.name] = t.content;
        //         return acc;
        //     }, {});
        
        this._metadata = metas;
        
        if (Reflect.hasOwnMetadata(resolveSymbol, this.viewModel))
            this._resolvers = Reflect.getOwnMetadata(resolveSymbol, this.viewModel);
        
        if (Reflect.hasOwnMetadata(pagesSymbol, this.viewModel))
            this._pages = Reflect.getOwnMetadata(pagesSymbol, this.viewModel);
    }
    
    
    // public reload(page: Function): void
    // {
    //     given(page, "page").ensureHasValue().ensureIsFunction();

    //     super.reload(page);

    //     if (!Reflect.hasOwnMetadata(appRouteSymbol, this.viewModel))
    //         throw new ApplicationException(`PageViewModel '${this.name}' does not have @route applied.`);

    //     const routeData = Reflect.getOwnMetadata(appRouteSymbol, this.viewModel);

    //     this._route = new RouteInfo(routeData.route);
    //     this._redirect = routeData.redirect;

    //     let title = this._title || null;
    //     if (Reflect.hasOwnMetadata(titleSymbol, this.viewModel))
    //         title = Reflect.getOwnMetadata(titleSymbol, this.viewModel);

    //     this._title = title;

    //     const metas = this._metadata ? Object.entries(this._metadata).map(t => ({name: t[0], content: t[1]})) : [];
    //     if (Reflect.hasOwnMetadata(metaSymbol, this.viewModel))
    //         metas.push(...Reflect.getOwnMetadata(metaSymbol, this.viewModel));

    //     this._metadata = metas
    //         .reduce((acc: any, t) =>
    //         {
    //             acc[t.name] = t.content;
    //             return acc;
    //         }, {});

    //     if (Reflect.hasOwnMetadata(resolveSymbol, this.viewModel))
    //         this._resolvers = Reflect.getOwnMetadata(resolveSymbol, this.viewModel);
    // }
}