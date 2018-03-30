import { route, template } from "./../../../../../src/index";
import * as Routes from "./../../routes";
import { BasePageViewModel } from "../../base-page-view-model";


@template(require("./list-todos-view.html"))
@route(Routes.listTodos)
export class ListTodosViewModel extends BasePageViewModel
{
    private readonly _message = "List Todos View";
    
    
    public get message(): string { return this._message; }
}