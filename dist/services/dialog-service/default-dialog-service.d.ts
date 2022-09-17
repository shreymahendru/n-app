import { DialogService, DialogServiceOptions } from "./dialog-service";
export declare class DefaultDialogService implements DialogService {
    private readonly _accentColor;
    private readonly _toastr;
    private readonly _loadingScreenType;
    private _loadingScreenCount;
    private _loadingScreen;
    private _spinner;
    constructor(options?: DialogServiceOptions);
    showLoadingScreen(): void;
    hideLoadingScreen(): void;
    showMessage(message: string, title?: string): void;
    showSuccessMessage(message: string, title?: string): void;
    showWarningMessage(message: string, title?: string): void;
    showErrorMessage(message: string, title?: string): void;
    clearMessages(): void;
    private _showSpinner;
    private _hideSpinner;
    private _showTopBar;
    private _hideTopBar;
    private _createLoadingScreen;
}
