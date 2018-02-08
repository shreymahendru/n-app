import { DialogService } from "./dialog-service";
export declare class DefaultDialogService implements DialogService {
    private readonly _accentColor;
    private _loadingScreenCount;
    private _loadingScreen;
    private _spinner;
    private _toastr;
    constructor(accentColor: string);
    showLoadingScreen(): void;
    hideLoadingScreen(): void;
    showMessage(message: string, title?: string): void;
    showSuccessMessage(message: string, title?: string): void;
    showWarningMessage(message: string, title?: string): void;
    showErrorMessage(message: string, title?: string): void;
    clearMessages(): void;
    private CreateLoadingScreen();
}
