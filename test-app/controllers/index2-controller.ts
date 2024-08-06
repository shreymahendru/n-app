import { ConfigurationManager } from "@nivinjoseph/n-config";
import { Controller, httpGet, route, view } from "@nivinjoseph/n-web";


const env = ConfigurationManager.getConfig("env");
console.log("evn", env);
const isDev = env === "dev";

@route("/abc")
@httpGet
@view(isDev ? "~/test-app/client/index.html" : "~/test-app/client/dist/index.html")
export class Index2Controller extends Controller
{
    public async execute(): Promise<any>
    {
        console.log("hit abc");
        return {
            config: {
                "testConfig": "value",
                "isAbc": true
            }
        };
    }
}