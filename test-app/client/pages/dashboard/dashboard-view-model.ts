import { route, view } from "./../../../../src/index";
import * as Routes from "./../routes";


@route(Routes.dashboard)
@view("dashboard-view")    
export class DashboardViewModel
{
    private readonly _message = "Dashboard View";
    
    
    public get message(): string { return this._message; }
}