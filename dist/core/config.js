"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    static get isDev() { return Config._isDev; }
    static enableDev(vue) {
        vue.config.silent = true;
        vue.config.devtools = true;
        vue.config.performance = true;
        vue.config.productionTip = true;
        Config._isDev = true;
    }
}
Config._isDev = false;
exports.Config = Config;
//# sourceMappingURL=config.js.map