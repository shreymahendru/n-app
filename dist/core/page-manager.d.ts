import { Container } from "@nivinjoseph/n-ject";
export declare class PageManager {
    private readonly _vueRouter;
    private readonly _container;
    private readonly _registrations;
    private _vueRouterInstance;
    private _unknownRoute;
    private _useHistoryMode;
    readonly useHistoryMode: boolean;
    readonly vueRouterInstance: any;
    constructor(vueRouter: any, container: Container);
    registerPages(...pageViewModelClasses: Function[]): void;
    useAsUnknownRoute(route: string): void;
    useHistoryModeRouting(): void;
    bootstrap(): void;
    private registerPage(pageViewModelClass);
    private createPageTree();
}
