import { BaseViewModel } from "./base-view-model";
export declare class PageViewModel extends BaseViewModel {
    protected readonly pathArgs: Object;
    protected readonly queryArgs: Object;
    protected onEnter(...params: any[]): void;
    protected onLeave(): void;
}
