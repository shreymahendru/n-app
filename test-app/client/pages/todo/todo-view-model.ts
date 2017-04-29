import { route, view } from "./../../../../src/index";
import * as Routes from "./../routes";


@route(Routes.todo)
@view("todo-view")    
export class TodoViewModel
{
    private readonly _message = "Todo View";
    
    
    public get message(): string { return this._message; }
}