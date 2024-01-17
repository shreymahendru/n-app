import { given } from "@nivinjoseph/n-defensive";
import { ApplicationException } from "@nivinjoseph/n-exception";
import { MetaDetail, metaSymbol } from "./meta.js";
import { RouteInfo } from "./route-info.js";
import { RouteDecoratorMetadata, appRouteSymbol } from "./route.js";
import { titleSymbol } from "./title.js";
import { ViewModelRegistration } from "./view-model-registration.js";
// import { authorizeSymbol } from "./authorize";
import { PageViewModelClass } from "./page-view-model.js";
import { pagesSymbol } from "./pages.js";
import { ResolveDecoratorMetadata, resolveSymbol } from "./resolve.js";


export class PageRegistration extends ViewModelRegistration
{
    private readonly _route: RouteInfo;
    private readonly _redirect: string | null;
    private readonly _title: string | null;
    private readonly _metadata: ReadonlyArray<MetaDetail>;
    private readonly _resolvers: ReadonlyArray<ResolveDecoratorMetadata> | null = null;
    private readonly _pages: ReadonlyArray<PageViewModelClass<any>> | null = null;

    private _resolvedValues: ReadonlyArray<any> | null = null;


    public get route(): RouteInfo { return this._route; }
    public get redirect(): string | null { return this._redirect; }
    public get title(): string | null { return this._title; }
    public get metadata(): ReadonlyArray<MetaDetail> { return this._metadata; }
    public get resolvers(): ReadonlyArray<ResolveDecoratorMetadata> | null { return this._resolvers; }
    public get pages(): ReadonlyArray<PageViewModelClass<any>> | null { return this._pages; }

    public get resolvedValues(): ReadonlyArray<any> | null { return this._resolvedValues; }
    public set resolvedValues(value: ReadonlyArray<any> | null) { this._resolvedValues = value; }


    public constructor(page: PageViewModelClass<any>, defaultPageTitle: string | null, defaultPageMetas: ReadonlyArray<MetaDetail> | null)
    {
        given(page as Function, "page").ensureHasValue().ensureIsFunction();
        given(defaultPageTitle, "defaultPageTitle").ensureIsString();
        given(defaultPageMetas, "defaultPageMetas").ensureIsArray();

        super(page);

        const metadata = page[Symbol.metadata]!;

        const routeData = metadata[appRouteSymbol] as RouteDecoratorMetadata | undefined;
        if (routeData == null)
            throw new ApplicationException(`PageViewModel '${this.name}' does not have @route applied.`);

        this._route = new RouteInfo(routeData.route);
        this._redirect = routeData.redirect ?? null;

        let title = metadata[titleSymbol] as string | undefined;
        if (title == null)
            title = defaultPageTitle ?? undefined;

        this._title = title ?? null;

        const allMeta: Array<MetaDetail> = defaultPageMetas ? [...defaultPageMetas] : [];

        const metas = metadata[metaSymbol] as ReadonlyArray<MetaDetail> | undefined;
        if (metas != null)
            allMeta.push(...metas);

        this._metadata = allMeta;

        const resolvers = metadata[resolveSymbol] as ReadonlyArray<ResolveDecoratorMetadata> | undefined;
        if (resolvers != null)
            this._resolvers = resolvers;

        const pages = metadata[pagesSymbol] as ReadonlyArray<PageViewModelClass<any>> | undefined;
        if (pages != null)
            this._pages = pages;
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