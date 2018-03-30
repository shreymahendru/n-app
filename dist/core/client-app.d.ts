declare const Vue: any;
export { Vue };
import "@nivinjoseph/n-ext";
import { Container, ComponentInstaller } from "@nivinjoseph/n-ject";
export declare class ClientApp {
    private readonly _appElementId;
    private readonly _container;
    private readonly _componentManager;
    private readonly _pageManager;
    private _app;
    private _accentColor;
    private _isBootstrapped;
    readonly container: Container;
    constructor(appElementId: string);
    useInstaller(installer: ComponentInstaller): this;
    useAccentColor(color: string): this;
    registerComponents(...componentViewModelClasses: Function[]): this;
    registerPages(...pageViewModelClasses: Function[]): this;
    useAsInitialRoute(route: string): this;
    useAsUnknownRoute(route: string): this;
    useHistoryModeRouting(): this;
    bootstrap(): void;
    private configureGlobalConfig();
    private configureComponents();
    private configurePages();
    private configureCoreServices();
    private configureContainer();
    private configureRoot();
}
