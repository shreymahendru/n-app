import { Controller, httpGet, route, view, TemplateBundle, ScriptBundle, StyleBundle} from "n-web";


@route("/")
@httpGet
@view("~/test-app/client/dist/index.html")
export class IndexController extends Controller
{
    public async execute(): Promise<any>
    {
        // let styles = new StyleBundle("styles", "test-app/client/dist/styles", "styles")
        //     .include("test-app/client/dist");
        
        // let templates = new TemplateBundle("templates")
        //     .include("test-app/client/dist");
        
        // let scripts = new ScriptBundle("scripts", "test-app/client/dist/scripts", "scripts")
        //     // .include("test-app/client/dist/scripts/jquery.js")    
        //     // .include("test-app/client/dist/scripts/app-bundle.js")
        //     .include("test-app/client/dist");
        
        // return Promise.resolve({
        //     styles: await styles.render(),
        //     templates: await templates.render(),
        //     scripts: await scripts.render()
        // });
        
        return {};
    }
}