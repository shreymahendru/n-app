import { ViewModelRegistration } from "./view-model-registration";
export declare class ComponentRegistration extends ViewModelRegistration {
    private readonly _element;
    private readonly _bindings;
    readonly element: string;
    readonly bindings: Array<string>;
    constructor(component: Function);
}
