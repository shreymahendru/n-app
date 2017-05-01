import { Controller, httpGet, route, view, TemplateBundle, ScriptBundle} from "n-web";


@route("/")
@httpGet
@view("default-view")
export class DefaultController extends Controller
{
    public execute(): Promise<any>
    {
        let templates = new TemplateBundle("templates");
        templates.includeDir("test-app/client");
        
        let scripts = new ScriptBundle("scripts");
        scripts.includeFile("test-app/client/dist/bundle.js");
        
        // console.log("cwd", process.cwd());
        
        // // let templates = new ClientViewTemplateBundler("test-app/client").render();
        // console.log("templates", templates.render().length);
        // console.log("scripts", scripts.render().length);
        
        return Promise.resolve({
            templates: templates.render(),
            scripts: scripts.render()
        });
    }
}