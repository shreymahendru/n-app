import { route, view } from "./../../../../../src/index";
import * as Routes from "./../../routes";


@route(Routes.listTodos)
@view("list-todos-view")
export class ListTodosViewModel
{
    private readonly _message = "List Todos View";
    
    
    public get message(): string { return this._message; }
}