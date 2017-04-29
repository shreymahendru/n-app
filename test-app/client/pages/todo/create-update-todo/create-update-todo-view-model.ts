import { route, view } from "./../../../../../src/index";
import * as Routes from "./../../routes";


@route(Routes.createUpdateTodo)
@view("create-update-todo-view")
export class CreateUpdateTodoViewModel
{
    private readonly _message = "Create Update Todo View";
    
    
    public get message(): string { return this._message; }
}