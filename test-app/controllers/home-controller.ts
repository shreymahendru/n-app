import { Controller, httpGet, route, view, ClientViewTemplateBundler } from "n-web";


@route("/Home")
@httpGet
@view("home-view.html")
export class HomeController extends Controller
{
    public execute(): Promise<any>
    {
        let templates = new ClientViewTemplateBundler("test-app/client").render();
        console.log(templates);
        
        return Promise.resolve({ templates: templates });
    }
}