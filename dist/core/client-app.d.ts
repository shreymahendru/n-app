declare const Vue: any;
export { Vue };
import "@nivinjoseph/n-ext";
import { Container, ComponentInstaller } from "@nivinjoseph/n-ject";
export declare class ClientApp {
    private readonly _appElementId;
    private readonly _rootComponentElement;
    private readonly _container;
    private readonly _componentManager;
    private readonly _pageManager;
    private _app;
    private _accentColor;
    private _errorTrackingConfigurationCallback;
    private _isBootstrapped;
    get container(): Container;
    /**
     *
     * @param appElementId
     * @param rootComponentElement
     *
     * @description Requires dev dependencies
     * Check the dev dependencies in package.json
     */
    constructor(appElementId: string, rootComponentElement: string);
    useInstaller(installer: ComponentInstaller): this;
    useAccentColor(color: string): this;
    registerComponents(...componentViewModelClasses: Function[]): this;
    registerPages(...pageViewModelClasses: Function[]): this;
    useAsInitialRoute(route: string): this;
    useAsUnknownRoute(route: string): this;
    useHistoryModeRouting(): this;
    configureErrorTracking(callback: (vueRouter: any) => void): this;
    bootstrap(): void;
    retrieveRouterInstance(): object;
    private configureGlobalConfig;
    private configureComponents;
    private configurePages;
    private _configureErrorTracking;
    private configureCoreServices;
    private configureContainer;
    private configureRoot;
}
