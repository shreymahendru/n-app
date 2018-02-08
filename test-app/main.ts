import { WebApp } from "n-web";
import { IndexController } from "./controllers/index-controller";
import { ConfigurationManager } from "n-config";


const app = new WebApp(ConfigurationManager.getConfig<number>("port"));

app
    .enableWebPackDevMiddleware(true)
    .useViewResolutionRoot("test-app/client/dist")
    .registerStaticFilePaths("test-app/client/dist")
    .registerControllers(IndexController);

app.bootstrap();
