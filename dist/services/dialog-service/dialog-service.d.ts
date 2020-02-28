export interface DialogService {
    showLoadingScreen(): void;
    hideLoadingScreen(): void;
    showMessage(message: string, title?: string): void;
    showSuccessMessage(message: string, title?: string): void;
    showWarningMessage(message: string, title?: string): void;
    showErrorMessage(message: string, title?: string): void;
    clearMessages(): void;
}
