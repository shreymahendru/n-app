import { route, view } from "./../../../../src/index";
import * as Routes from "./../routes";
import { BasePageViewModel } from "./../base-page-view-model";


@route(Routes.dashboard)
@view("dashboard-view")    
export class DashboardViewModel extends BasePageViewModel
{
    private readonly _message = "Dashboard View";
    private _score = 10;
    
    
    public get score(): number { return this._score; }
    
    
    public get message(): string { return this._message; }
    
    
    public increment(): void
    {
        this._score++;
    }
}