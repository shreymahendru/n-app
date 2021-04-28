import "simplebar/dist/simplebar.css";
import { ComponentViewModel } from "../../core/component-view-model";
import "./n-scroll-container-view.scss";
export declare class NScrollContainerViewModel extends ComponentViewModel {
    private _sb;
    get isHorizontalOnly(): boolean;
    get isVerticalOnly(): boolean;
    protected onCreate(): void;
    protected onMount(element: HTMLElement): void;
    protected onDestroy(): void;
}
