import { WebApp } from "@nivinjoseph/n-web";
import { IndexController } from "./controllers/index-controller";
import { ConfigurationManager } from "@nivinjoseph/n-config";
import * as Path from "path";


const app = new WebApp(ConfigurationManager.getConfig<number>("port"), null);

app
    .enableWebPackDevMiddleware("/", Path.resolve(__dirname, "../my-webpack.config.js"))
    .useViewResolutionRoot("test-app/client/dist")
    .registerStaticFilePath("test-app/client/dist")
    .registerControllers(IndexController);

app.bootstrap();
