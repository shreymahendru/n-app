import { WebApp } from "n-web";
import { HomeController } from "./controllers/home-controller";
import { ConfigurationManager } from "n-config";


const app = new WebApp(ConfigurationManager.getConfig<number>("port"))
    .registerStaticFilePaths("test-app/client/dist")
    .registerControllers(HomeController);

app.bootstrap();
