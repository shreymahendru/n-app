export interface NavigationService 
{
    readonly currentRoutePath: string;
    readonly currentRouteFullPath: string;
    readonly currentRouteHash: string;
    
    navigate(route: string, params?: object | null, replaceHistory?: boolean): void;
    navigateBack(): void;
    navigateForward(): void;
    
    navigateSiteSameTab(url: string, replaceHistory?: boolean): void;
    navigateSiteNewTab(url: string): void;
    navigateSitePostSameTab(url: string, value: object): void;
    navigateSitePostNewTab(url: string, value: object): void;
    getSiteQueryParam(key: string): string;
}