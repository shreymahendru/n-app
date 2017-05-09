import { Controller, httpGet, route, view, TemplateBundle, ScriptBundle} from "n-web";


@route("/")
@httpGet
@view("default-view")
export class DefaultController extends Controller
{
    public async execute(): Promise<any>
    {
        let templates = new TemplateBundle("templates")
            .include("test-app/client");
        
        let scripts = new ScriptBundle("scripts", "test-app/client/dist/scripts", "scripts")
            .include("test-app/client/dist/scripts/jquery.js")    
            .include("test-app/client/dist/scripts/app-bundle.js");
        
        return Promise.resolve({
            templates: await templates.render(),
            scripts: await scripts.render()
        });
    }
}