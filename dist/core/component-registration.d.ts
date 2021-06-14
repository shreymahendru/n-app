import { ViewModelRegistration } from "./view-model-registration";
export declare class ComponentRegistration extends ViewModelRegistration {
    private readonly _element;
    private readonly _bindings;
    private readonly _hasModel;
    private readonly _events;
    get element(): string;
    get bindings(): Array<string>;
    get hasModel(): boolean;
    get events(): Array<string>;
    constructor(component: Function);
}
