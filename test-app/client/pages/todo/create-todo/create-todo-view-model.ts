import { route, view } from "./../../../../../src/index";
import * as Routes from "./../../routes";


@route(Routes.createTodo)
@view("create-todo-view")
export class CreateTodoViewModel
{
    private readonly _message = "Create Todo View";
    
    
    public get message(): string { return this._message; }
}