"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_web_1 = require("n-web");
const default_controller_1 = require("./controllers/default-controller");
const n_config_1 = require("n-config");
const app = new n_web_1.WebApp(n_config_1.ConfigurationManager.getConfig("port"))
    .useViewResolutionRoot("test-app/controllers")
    .registerStaticFilePaths("test-app/client/dist")
    .registerControllers(default_controller_1.DefaultController);
app.bootstrap();
//# sourceMappingURL=main.js.map