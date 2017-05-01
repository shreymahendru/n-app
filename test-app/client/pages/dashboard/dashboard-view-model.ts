import { route, view, DialogService, EventAggregator, NavigationService, StorageService } from "./../../../../src/index";
import * as Routes from "./../routes";
import { BasePageViewModel } from "./../base-page-view-model";
import { inject } from "n-ject";


@route(Routes.dashboard)
@view("dashboard-view")    
@inject("DialogService", "EventAggregator", "NavigationService", "StorageService")    
export class DashboardViewModel extends BasePageViewModel
{
    private readonly _dialogService: DialogService;
    private readonly _eventAggregator: EventAggregator;
    private readonly _navigationService: NavigationService;
    private readonly _storageService: StorageService;
    
    
    private readonly _message = "Dashboard View";
    private _score = 10;
    
    
    public constructor(dialogService: DialogService, evenAggregator: EventAggregator,
        navigationService: NavigationService, storageService: StorageService)
    {
        super();
        
        this._dialogService = dialogService;
        this._eventAggregator = evenAggregator;
        this._navigationService = navigationService;
        this._storageService = storageService;
    }
    
    
    
    public get score(): number { return this._score; }
    
    
    public get message(): string { return this._message; }
    
    
    public increment(): void
    {
        this._score++;
        
        this._dialogService.showLoadingScreen();
        setTimeout(() => this._dialogService.hideLoadingScreen(), 5000);
        
        this._dialogService.showErrorMessage("haha");
        
        this._navigationService.navigate(Routes.updateTodo, { id: 5 });
    }
}