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
    _errorTrackingConfigurationCallback: (vueRouter: any) => void;
    private _isBootstrapped;
    get container(): Container;
    /**
     *
     * @param appElementId
     * @param rootComponentElement
     *
     * @description Requires dev dependencies
     * "@babel/core": "^7.14.6",
        "@babel/preset-env": "^7.14.7",
        "@nivinjoseph/n-web": "latest",
        "autoprefixer": "^10.2.6",
        "babel-loader": "^8.2.2",
        "btoa": "^1.2.1",
        "clean-webpack-plugin": "^3.0.0",
        "compression-webpack-plugin": "^6.1.1",
        "css-loader": "^5.2.4",
        "enhanced-resolve": "^5.8.0",
        "fibers": "^5.0.0",
        "file-loader": "^6.2.0",
        "fork-ts-checker-webpack-plugin": "^6.2.5",
        "hash-sum": "^2.0.0",
        "html-loader": "^0.5.5",
        "html-webpack-plugin": "^4.5.1",
        "imagemin": "^7.0.1",
        "imagemin-gifsicle": "^7.0.0",
        "imagemin-jpegtran": "^7.0.0",
        "imagemin-mozjpeg": "^9.0.0",
        "imagemin-pngquant": "^9.0.2",
        "imagemin-svgo": "^9.0.0",
        "imagemin-webp": "^6.0.0",
        "koa-webpack": "^6.0.0",
        "loader-utils": "^2.0.0",
        "memory-fs": "^0.5.0",
        "mini-css-extract-plugin": "^1.3.9",
        "node-sass": "^6.0.1",
        "optimize-css-assets-webpack-plugin": "^5.0.4",
        "postcss": "^8.2.13",
        "postcss-flexbugs-fixes": "^5.0.2",
        "postcss-loader": "^4.2.0",
        "sass": "^1.35.1",
        "sass-loader": "^10.1.1",
        "sharp": "^0.28.3",
        "source-map-loader": "^1.1.3",
        "style-loader": "^2.0.0",
        "terser-webpack-plugin": "^4.2.3",
        "ts-loader": "^8.1.0",
        "tslint": "^6.1.3",
        "tslint-loader": "^3.5.4",
        "typescript": "latest",
        "url-loader": "^4.1.1",
        "vue-hot-reload-api": "^2.3.4",
        "vue-loader": "^15.9.6",
        "vue-template-compiler": "2.6.11",
        "webpack": "^4.44.2",
        "webpack-cli": "^4.1.0",
        "worker-loader": "^3.0.8"
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
