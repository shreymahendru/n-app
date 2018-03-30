import { route, template } from "./../../../../src/index";
import * as Routes from "./../routes";
import { BasePageViewModel } from "../base-page-view-model";


@template(require("./todo-view.html"))
@route(Routes.todo, Routes.listTodos)
export class TodoViewModel extends BasePageViewModel
{
    private readonly _message = "Todo View";
    
    
    public get message(): string { return this._message; }
}