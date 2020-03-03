import { ViewModelRegistration } from "./view-model-registration";
export declare class ComponentRegistration extends ViewModelRegistration {
    private _element;
    private _bindings;
    private _hasModel;
    get element(): string;
    get bindings(): Array<string>;
    get hasModel(): boolean;
    constructor(component: Function);
    reload(component: Function): void;
}
