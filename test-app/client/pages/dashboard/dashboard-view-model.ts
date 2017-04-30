import { route, view } from "./../../../../src/index";
import * as Routes from "./../routes";
import { PageViewModel } from "./../page-view-model";


@route(Routes.dashboard)
@view("dashboard-view")    
export class DashboardViewModel extends PageViewModel
{
    private readonly _message = "Dashboard View";
    
    
    public get message(): string { return this._message; }
}