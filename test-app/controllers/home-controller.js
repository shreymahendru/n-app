"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const n_web_1 = require("n-web");
let HomeController = class HomeController extends n_web_1.Controller {
    execute() {
        let templates = new n_web_1.ClientViewTemplateBundler("test-app/client").render();
        console.log(templates);
        return Promise.resolve({ templates: templates });
    }
};
HomeController = __decorate([
    n_web_1.route("/Home"),
    n_web_1.httpGet,
    n_web_1.view("home-view.html")
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=home-controller.js.map