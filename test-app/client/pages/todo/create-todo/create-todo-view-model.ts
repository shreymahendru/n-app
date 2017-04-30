import { route, view } from "./../../../../../src/index";
import * as Routes from "./../../routes";
import { BasePageViewModel } from "../../base-page-view-model";


@route(Routes.createTodo)
@view("create-todo-view")
export class CreateTodoViewModel extends BasePageViewModel
{
    private readonly _message = "Create Todo View";
    
    
    public get message(): string { return this._message; }
}