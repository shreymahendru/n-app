import { route, template } from "./../../../../src/index";
import * as Routes from "./../routes";
import { BasePageViewModel } from "./../base-page-view-model";
import "./test-view.scss";


@template(require("./test-view.html"))
@route(Routes.test)
export class TestViewModel extends BasePageViewModel
{
    
}