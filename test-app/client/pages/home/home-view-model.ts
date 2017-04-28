import { route, view } from "./../../../../src/index";


@route("/")
@view("home-view.html")    
export class HomeViewModel
{
    private _message = "you are in home view";


    public get message(): string { return this._message; }
}