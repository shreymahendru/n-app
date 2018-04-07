import { BaseViewModel } from "./base-view-model";
export declare class ComponentViewModel extends BaseViewModel {
    private readonly bindings;
    protected getBound<T>(propertyName: string): T;
    protected getBoundModel<T>(): T;
    protected setBoundModel(value: any): void;
}
