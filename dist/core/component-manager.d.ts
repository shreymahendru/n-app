import { Container } from "n-ject";
export declare class ComponentManager {
    private readonly _vue;
    private readonly _container;
    private readonly _registrations;
    constructor(vue: any, container: Container);
    registerComponents(...componentViewModelClasses: Function[]): void;
    bootstrap(): void;
    private registerComponent(componentViewModelClass);
}
