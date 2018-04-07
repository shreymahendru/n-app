import { ViewModelRegistration } from "./view-model-registration";
export declare class ComponentRegistration extends ViewModelRegistration {
    private readonly _element;
    private readonly _bindings;
    private readonly _hasModel;
    readonly element: string;
    readonly bindings: Array<string>;
    readonly hasModel: boolean;
    constructor(component: Function);
}
