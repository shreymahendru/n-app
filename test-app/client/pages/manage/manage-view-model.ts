import { route, view } from "./../../../../src/index";


@route("/manage")
@view("manage-view.html")    
export class ManageViewModel
{
    private _message = "you are in manage view";
    
    
    public get message(): string { return this._message; }
}