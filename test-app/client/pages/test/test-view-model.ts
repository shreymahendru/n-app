import { route, template } from "./../../../../src/index";
import * as Routes from "./../routes";
import { BasePageViewModel } from "./../base-page-view-model";
import "./test-view.scss";
import { inject } from "@nivinjoseph/n-ject";
import { TodoRepository } from "../../services/todo-repository/todo-repository";
import { given } from "@nivinjoseph/n-defensive";


@template(require("./test-view.html"))
@route(Routes.test)
@inject("TodoRepository")    
export class TestViewModel extends BasePageViewModel
{
    private readonly _todoRepository: TodoRepository;
    
    
    public constructor(todoRepository: TodoRepository)
    {
        given(todoRepository, "todoRepository").ensureHasValue().ensureIsObject();
        
        super();
        
        this._todoRepository = todoRepository;
    }
}


// @template(require("./test-view.html"))
// @route(Routes.test)
// export class TestViewModel extends BasePageViewModel
// {
// }