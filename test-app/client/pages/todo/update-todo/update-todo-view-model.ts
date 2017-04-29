import { route, view } from "./../../../../../src/index";
import * as Routes from "./../../routes";


@route(Routes.updateTodo)
@view("update-todo-view")
export class UpdateTodoViewModel
{
    private readonly _message = "Update Todo View";


    public get message(): string { return this._message; }
}