export interface NavigationService 
{
    navigate(route: string, params: Object, replaceHistory?: boolean): void;
    navigateBack(): void;
    navigateForward(): void;
    
    navigateSiteSameTab(url: string, replceHistory?: boolean): void;
    navigateSiteNewTab(url: string): void;
    navigateSitePostSameTab(url: string, value: Object): void;
    navigateSitePostNewTab(url: string, value: Object): void;
    getSiteQueryParam(key: string): string;
}