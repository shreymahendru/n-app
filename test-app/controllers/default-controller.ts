import { Controller, httpGet, route, view, ClientViewTemplateBundler } from "n-web";


@route("/")
@httpGet
@view("default-view.html")
export class DefaultController extends Controller
{
    public execute(): Promise<any>
    {
        let templates = new ClientViewTemplateBundler("test-app/client").render();
        return Promise.resolve({ templates: templates });
    }
}