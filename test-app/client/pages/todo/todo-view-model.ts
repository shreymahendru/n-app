import { route, view } from "./../../../../src/index";
import * as Routes from "./../routes";
import { BasePageViewModel } from "../base-page-view-model";


@route(Routes.todo)
@view("todo-view")    
export class TodoViewModel extends BasePageViewModel
{
    private readonly _message = "Todo View";
    
    
    public get message(): string { return this._message; }
}