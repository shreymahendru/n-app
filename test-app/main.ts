import { WebApp } from "@nivinjoseph/n-web";
import { IndexController } from "./controllers/index-controller";
import { ConfigurationManager } from "@nivinjoseph/n-config";


const app = new WebApp(ConfigurationManager.getConfig<number>("port"));

app
    .enableWebPackDevMiddleware()
    .useViewResolutionRoot("test-app/client/dist")
    .registerStaticFilePaths("test-app/client/dist")
    .registerControllers(IndexController);

app.bootstrap();
