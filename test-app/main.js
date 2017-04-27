"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_web_1 = require("n-web");
const home_controller_1 = require("./controllers/home-controller");
const n_config_1 = require("n-config");
const app = new n_web_1.WebApp(n_config_1.ConfigurationManager.getConfig("port"))
    .registerStaticFilePaths("test-app/client/dist")
    .registerControllers(home_controller_1.HomeController);
app.bootstrap();
//# sourceMappingURL=main.js.map