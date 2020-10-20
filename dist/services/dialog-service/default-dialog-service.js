"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultDialogService = void 0;
const Toastr = require("./../../../vendor/toastr.js");
if (!Toastr)
    console.log("No Toastr!!!");
const Spinner = require("./../../../vendor/spin.js");
if (!Spinner)
    console.log("No Spinner!!!");
const $ = require("jquery");
class DefaultDialogService {
    constructor(accentColor) {
        this._accentColor = "#000";
        this._loadingScreenCount = 0;
        if (accentColor)
            this._accentColor = accentColor.trim();
        this._toastr = window.toastr;
        this._toastr.options.timeOut = 4000;
        this._toastr.options.positionClass = "toast-bottom-right";
        this._toastr.options.newestOnTop = false;
    }
    showLoadingScreen() {
        if (this._loadingScreenCount === 0) {
            if (!this._loadingScreen) {
                this.CreateLoadingScreen();
            }
            this._loadingScreen.show();
            this._spinner.spin(document.getElementById("spinnerLocation"));
        }
        this._loadingScreenCount++;
    }
    hideLoadingScreen() {
        this._loadingScreenCount--;
        if (this._loadingScreenCount < 0)
            this._loadingScreenCount = 0;
        if (this._loadingScreenCount === 0) {
            if (this._loadingScreen && this._spinner) {
                this._spinner.stop();
                this._loadingScreen.hide();
            }
        }
    }
    showMessage(message, title) {
        if (title) {
            this._toastr.info(message, title);
        }
        else {
            this._toastr.info(message);
        }
    }
    showSuccessMessage(message, title) {
        if (title) {
            this._toastr.success(message, title);
        }
        else {
            this._toastr.success(message);
        }
    }
    showWarningMessage(message, title) {
        if (title) {
            this._toastr.warning(message, title);
        }
        else {
            this._toastr.warning(message);
        }
    }
    showErrorMessage(message, title) {
        if (title) {
            this._toastr.error(message, title);
        }
        else {
            this._toastr.error(message);
        }
    }
    clearMessages() {
        this._toastr.clear();
    }
    CreateLoadingScreen() {
        this._loadingScreen = $("<div style='position:fixed;top:0;left:0;right:0;bottom:0;z-index:100000000;background-color:rgba(255, 255, 255, 0.1);'><div id='spinnerLocation' style='position:absolute;top:50%;left:50%;'></div></div>")
            .appendTo($("body"));
        let opts = {
            lines: 12,
            length: 10,
            width: 4,
            radius: 10,
            corners: 1,
            rotate: 0,
            direction: 1,
            color: this._accentColor,
            speed: 1,
            trail: 60,
            shadow: false,
            hwaccel: false,
            className: "spinner",
            zIndex: 2e9,
            top: "auto",
            left: "auto"
        };
        let target = document.getElementById("spinnerLocation");
        this._spinner = new Spinner(opts).spin(target);
        this._spinner.stop();
        this._loadingScreen.hide();
    }
}
exports.DefaultDialogService = DefaultDialogService;
//# sourceMappingURL=default-dialog-service.js.map