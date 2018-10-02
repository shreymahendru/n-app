export declare class BaseViewModel {
    private readonly _watches;
    private _executeOnCreate;
    private _executeOnDestroy;
    protected readonly ctx: any;
    protected onCreate(): void;
    protected onMount(element: HTMLElement): void;
    protected onDestroy(): void;
    protected executeOnCreate(funcToExecute: () => void): void;
    protected executeOnDestroy(funcToExecute: () => void): void;
    protected watch<T>(propertyName: string, callback: (value: T, oldValue: T) => void): void;
    protected unWatch(propertyName: string): void;
}
