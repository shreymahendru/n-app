declare const Vue: any;
export { Vue };
import "@nivinjoseph/n-ext";
import { Container, ComponentInstaller } from "@nivinjoseph/n-ject";
import { ClassHierarchy } from "@nivinjoseph/n-util";
import { ComponentViewModel } from "./component-view-model";
import { PageViewModel } from "./page-view-model";
export declare class ClientApp {
    private readonly _appElementId;
    private readonly _rootComponentElement;
    private readonly _options;
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
    constructor(appElementId: string, rootComponentElement: string, options?: object);
    useInstaller(installer: ComponentInstaller): this;
    useAccentColor(color: string): this;
    registerComponents(...componentViewModelClasses: Array<ClassHierarchy<ComponentViewModel>>): this;
    registerPages(...pageViewModelClasses: Array<ClassHierarchy<PageViewModel>>): this;
    useAsInitialRoute(route: string): this;
    useAsUnknownRoute(route: string): this;
    useHistoryModeRouting(): this;
    configureErrorTracking(callback: (vueRouter: any) => void): this;
    bootstrap(): void;
    retrieveRouterInstance(): object;
    private _configureGlobalConfig;
    private _configureComponents;
    private _configurePages;
    private _configureErrorTracking;
    private _configureCoreServices;
    private _configureContainer;
    private _configureRoot;
}
