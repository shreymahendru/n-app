import { Controller, httpGet, route, view, TemplateBundle, ScriptBundle} from "n-web";


@route("/")
@httpGet
@view("default-view")
export class DefaultController extends Controller
{
    public execute(): Promise<any>
    {
        let templates = new TemplateBundle("templates");
        templates.include("test-app/client");
        
        let scripts = new ScriptBundle("scripts", "test-app/client/dist/scripts", "scripts");
        scripts
            // .include("node_modules/jquery/dist/jquery.js")    
            .include("test-app/client/dist/scripts/app-bundle.js");
        
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