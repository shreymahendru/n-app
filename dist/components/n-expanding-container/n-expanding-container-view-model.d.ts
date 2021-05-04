import { ComponentViewModel } from "../../core/component-view-model";
import "./n-expanding-container-view.scss";
export declare class NExpandingContainerViewModel extends ComponentViewModel {
    get _constrainHorizontal(): boolean;
    get myRenderKey(): any;
    protected onMount(element: HTMLElement): void;
    protected onDestroy(): void;
    private recalculate;
    private doHorizontal;
    private doVertical;
}
