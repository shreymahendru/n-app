import { BaseViewModel } from "./base-view-model";
import "@nivinjoseph/n-ext";
export declare class PageViewModel extends BaseViewModel {
    protected readonly currentRoute: string;
    protected readonly pathArgs: Object;
    protected readonly queryArgs: Object;
    protected onEnter(...params: any[]): void;
    protected onLeave(): void;
}
