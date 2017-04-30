import { route, view } from "./../../../../../src/index";
import * as Routes from "./../../routes";
import { PageViewModel } from "../../page-view-model";


@route(Routes.createTodo)
@view("create-todo-view")
export class CreateTodoViewModel extends PageViewModel
{
    private readonly _message = "Create Todo View";
    
    
    public get message(): string { return this._message; }
}