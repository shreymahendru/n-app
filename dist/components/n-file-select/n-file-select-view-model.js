"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFileSelectViewModel = void 0;
const tslib_1 = require("tslib");
const template_1 = require("../../core/template");
const element_1 = require("../../core/element");
const bind_1 = require("../../core/bind");
const component_view_model_1 = require("../../core/component-view-model");
const n_ject_1 = require("@nivinjoseph/n-ject");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const $ = require("jquery");
const n_exception_1 = require("@nivinjoseph/n-exception");
let NFileSelectViewModel = class NFileSelectViewModel extends component_view_model_1.ComponentViewModel {
    constructor(dialogService, eventAggregator) {
        super();
        this._inputTemplate = `<input type="file" accept="{0}" style="display: none" />`;
        this._inputTemplateMultiple = `<input type="file" accept="{0}" multiple style="display: none" />`;
        n_defensive_1.given(dialogService, "dialogService").ensureHasValue().ensureIsObject();
        this._dialogService = dialogService;
        n_defensive_1.given(eventAggregator, "eventAggregator").ensureHasValue().ensureIsObject();
        this._eventAggregator = eventAggregator;
        this.executeOnCreate(() => {
            const id = this.getBound("id");
            if (id == null || typeof (id) !== "string" || id.isEmptyOrWhiteSpace())
                throw new n_exception_1.ArgumentException("id", "id not specified for file-select");
            const sub = this._eventAggregator.subscribe("openFileSelect", (identifier) => {
                if (identifier !== id)
                    return;
                this._inputElement.click();
            });
            this.executeOnDestroy(() => sub.unsubscribe());
        });
    }
    get mimeTypesList() { return this.getBound("mimeTypes"); }
    get maxFileSizeValue() { return parseInt(this.getBound("maxFileSize")); }
    get isMultiple() { return this.getBound("multiple") != null && this.getBound("multiple") === "true"; }
    onMount(element) {
        this.initializeMaxFileSizeBytes();
        const inputText = this.isMultiple
            ? this._inputTemplateMultiple.format(this.mimeTypesList) : this._inputTemplate.format(this.mimeTypesList);
        const that = this;
        const fchange = function () {
            that.processFiles(this.files);
            $(this).off("change");
            $(this).remove();
            that._inputElement = $(inputText);
            that._inputElement.change(fchange).appendTo($(element));
        };
        this._inputElement = $(inputText);
        this._inputElement.change(fchange).appendTo($(element));
    }
    processFiles(files) {
        this._dialogService.showLoadingScreen();
        const promises = new Array();
        if (files == null || files.length === 0)
            return;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileInfo = {};
            fileInfo.nativeFile = file;
            fileInfo.fileName = file.name;
            fileInfo.fileType = file.type;
            fileInfo.fileSize = file.size;
            // if (fileInfo.fileType == null || fileInfo.fileType.isEmptyOrWhiteSpace())
            // {
            //     if (fileInfo.fileName.contains("."))
            //     {
            //         const splitted = fileInfo.fileName.trim().split(".");
            //         fileInfo.fileType = "." + splitted[splitted.length - 1].trim();
            //     }
            // }
            const reader = new FileReader();
            const promise = new Promise((resolve, reject) => {
                reader.onload = function (fi, res) {
                    return function (e) {
                        fi.fileDataUrl = e.target.result;
                        const splitted = e.target.result.split(",");
                        fi.fileMime = splitted[0].trim().split(";")[0].substr(5);
                        fi.fileData = splitted[1];
                        res(fi);
                    };
                }(fileInfo, resolve);
                reader.onerror = function (rej) {
                    return function (e) {
                        rej(e);
                    };
                }(reject);
            });
            reader.readAsDataURL(file);
            promises.push(promise);
        }
        Promise.all(promises)
            .then((results) => {
            const processedFiles = new Array();
            const failedFiles = new Array();
            results.forEach(t => {
                if (this.ensureFileSizeIsAllowed(t))
                    processedFiles.push(t);
                else
                    failedFiles.push(t);
            });
            failedFiles.forEach(t => this._dialogService.showWarningMessage("File {0} exceeded the file size limit of {1} MB.".format(t.fileName, this.maxFileSizeValue)));
            if (processedFiles.length > 0) {
                this.getBound("onSelection")(this.isMultiple ? processedFiles : processedFiles[0]);
            }
            this._dialogService.hideLoadingScreen();
        })
            .catch((e) => {
            console.log(e);
            this._dialogService.showErrorMessage("An error occurred while processing the files.", "ERROR");
            this._dialogService.hideLoadingScreen();
        });
    }
    ensureFileSizeIsAllowed(fileInfo) {
        return this._maxFileSizeBytes != null ? fileInfo.fileSize <= this._maxFileSizeBytes : true;
    }
    initializeMaxFileSizeBytes() {
        this._maxFileSizeBytes = this.maxFileSizeValue != null ? this.maxFileSizeValue * 1024 * 1024 : null;
    }
};
NFileSelectViewModel = tslib_1.__decorate([
    template_1.template(require("./n-file-select-view.html")),
    element_1.element("n-file-select"),
    bind_1.bind("id", "mimeTypes", "maxFileSize", "multiple", "onSelection"),
    n_ject_1.inject("DialogService", "EventAggregator"),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], NFileSelectViewModel);
exports.NFileSelectViewModel = NFileSelectViewModel;
//# sourceMappingURL=n-file-select-view-model.js.map