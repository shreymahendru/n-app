import { BaseViewModel } from "./base-view-model";
export declare class ComponentViewModel extends BaseViewModel {
    private get _myBindings();
    private get _myEvents();
    protected getBound<T>(propertyName: string): T;
    protected getBoundModel<T>(): T;
    protected setBoundModel(value: any): void;
    protected emit(event: string, ...eventArgs: any[]): void;
    static createComponentOptions(component: Function): object;
    private _camelCaseToKebabCase;
}
