import { route, view } from "./../../../../../src/index";
import * as Routes from "./../../routes";
import { BasePageViewModel } from "../../base-page-view-model";


@route(Routes.updateTodo)
@view("update-todo-view")
export class UpdateTodoViewModel extends BasePageViewModel
{
    private readonly _message = "Update Todo View";


    public get message(): string { return this._message; }
}