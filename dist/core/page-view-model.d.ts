import { BaseViewModel } from "./base-view-model";
import "@nivinjoseph/n-ext";
export declare class PageViewModel extends BaseViewModel {
    protected get currentRoute(): string;
    protected get pathArgs(): Object;
    protected get queryArgs(): Object;
    protected onEnter(...params: any[]): void;
    protected onLeave(): void;
}
