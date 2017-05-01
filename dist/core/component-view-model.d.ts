export declare class ComponentViewModel {
    private _executeOnCreate;
    private _executeOnDestroy;
    protected readonly ctx: any;
    protected onCreate(): void;
    protected onDestroy(): void;
    protected executeOnCreate(funcToExecute: () => void): void;
    protected executeOnDestroy(funcToExecute: () => void): void;
}
