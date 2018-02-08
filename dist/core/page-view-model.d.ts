import { ComponentViewModel } from "./component-view-model";
export declare class PageViewModel extends ComponentViewModel {
    protected readonly pathArgs: Object;
    protected readonly queryArgs: Object;
    protected onEnter(...params: any[]): void;
    protected onLeave(): void;
}
