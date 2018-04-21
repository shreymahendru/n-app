"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        // var opts = {
        //    lines: 13, // The number of lines to draw
        //    length: 20, // The length of each line
        //    width: 10, // The line thickness
        //    radius: 30, // The radius of the inner circle
        //    corners: 1, // Corner roundness (0..1)
        //    rotate: 0, // The rotation offset
        //    direction: 1, // 1: clockwise, -1: counterclockwise
        //    color: '#FF7C00', //'#000', // #rgb or #rrggbb or array of colors
        //    speed: 1, // Rounds per second
        //    trail: 60, // Afterglow percentage
        //    shadow: false, // Whether to render a shadow
        //    hwaccel: false, // Whether to use hardware acceleration
        //    className: 'spinner', // The CSS class to assign to the spinner
        //    zIndex: 2e9, // The z-index (defaults to 2000000000)
        //    top: 'auto', // Top position relative to parent in px
        //    left: 'auto' // Left position relative to parent in px
        // };
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
            left: "auto" // Left position relative to parent in px
        };
        let target = document.getElementById("spinnerLocation");
        this._spinner = new Spinner(opts).spin(target);
        this._spinner.stop();
        this._loadingScreen.hide();
    }
}
exports.DefaultDialogService = DefaultDialogService;
//# sourceMappingURL=default-dialog-service.js.map