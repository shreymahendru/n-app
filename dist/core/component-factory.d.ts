import { Container } from "n-ject";
import { ViewModelRegistration } from "./view-model-registration";
export declare class ComponentFactory {
    private readonly _container;
    constructor(container: Container);
    create(registration: ViewModelRegistration): Object;
}
