import { Container } from "@nivinjoseph/n-ject";
import { ViewModelRegistration } from "./view-model-registration";
import "@nivinjoseph/n-ext";
export declare class ComponentFactory {
    private readonly _container;
    constructor(container: Container);
    create(registration: ViewModelRegistration): Object;
}
