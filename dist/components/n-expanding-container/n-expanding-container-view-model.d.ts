import { ComponentViewModel } from "../../core/component-view-model";
import "./n-expanding-container-view.scss";
export declare class NExpandingContainerViewModel extends ComponentViewModel {
    get _constrainHorizontal(): boolean;
    protected onMount(element: HTMLElement): void;
    private doHorizontal;
    private doVertical;
}
