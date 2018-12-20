import { Container } from "@nivinjoseph/n-ject";
export declare class PageManager {
    private readonly _vueRouter;
    private readonly _container;
    private readonly _pageViewModelClasses;
    private readonly _authorizerClasses;
    private readonly _authorizers;
    private readonly _registrations;
    private _vueRouterInstance;
    private _initialRoute;
    private _unknownRoute;
    private _defaultPageTitle;
    private _defaultPageMetas;
    private _useHistoryMode;
    private _defaultAuthorizerClass;
    private _defaultAuthorizer;
    private _authorizeFailRoute;
    readonly useHistoryMode: boolean;
    readonly vueRouterInstance: any;
    constructor(vueRouter: any, container: Container);
    registerPages(...pageViewModelClasses: Function[]): void;
    registerAuthorizers(...authorizerClasses: Function[]): void;
    useAsDefaultAuthorizer(authorizerClass: Function): void;
    useAsAuthorizeFailRoute(route: string): void;
    useAsInitialRoute(route: string): void;
    useAsUnknownRoute(route: string): void;
    useAsDefaultPageTitle(title: string): void;
    useAsDefaultPageMetadata(metas: ReadonlyArray<{
        name: string;
        content: string;
    }>): void;
    useHistoryModeRouting(): void;
    bootstrap(): void;
    private registerAuthorizer;
    private registerPage;
    private createRouting;
    private createPageTree;
    private configureAuthorization;
}
