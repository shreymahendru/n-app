import { NavigationService } from "./navigation-service";
import "@nivinjoseph/n-ext";
export declare class DefaultNavigationService implements NavigationService {
    private readonly _vueRouter;
    readonly currentRoutePath: string;
    readonly currentRouteHash: string;
    constructor(vueRouter: any);
    navigate(route: string, params: Object, replaceHistory?: boolean): void;
    navigateBack(): void;
    navigateForward(): void;
    navigateSiteSameTab(url: string, replaceHistory?: boolean): void;
    navigateSiteNewTab(url: string): void;
    navigateSitePostSameTab(url: string, value: Object): void;
    navigateSitePostNewTab(url: string, value: Object): void;
    getSiteQueryParam(key: string): string;
    private createForm(url, value);
    private getHash();
}
