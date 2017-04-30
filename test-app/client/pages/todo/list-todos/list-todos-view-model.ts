import { route, view } from "./../../../../../src/index";
import * as Routes from "./../../routes";
import { PageViewModel } from "../../page-view-model";


@route(Routes.listTodos)
@view("list-todos-view")
export class ListTodosViewModel extends PageViewModel
{
    private readonly _message = "List Todos View";
    
    
    public get message(): string { return this._message; }
}