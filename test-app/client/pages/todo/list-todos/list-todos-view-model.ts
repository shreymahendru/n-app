import { route, view } from "./../../../../../src/index";
import * as Routes from "./../../routes";
import { BasePageViewModel } from "../../base-page-view-model";


@route(Routes.listTodos)
@view("list-todos-view")
export class ListTodosViewModel extends BasePageViewModel
{
    private readonly _message = "List Todos View";
    
    
    public get message(): string { return this._message; }
}