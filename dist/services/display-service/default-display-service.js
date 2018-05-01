"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const display_type_1 = require("./display-type");
const $ = require("jquery");
class DefaultDisplayService {
    constructor() {
        this._currentDisplayType = null;
        this._currentDisplayWidth = null;
        this._currentDisplayHeight = null;
        this.CalculateCurrentDisplayType();
        $(window).resize(() => {
            this.CalculateCurrentDisplayType();
        });
    }
    get CurrentDisplayType() { return this._currentDisplayType; }
    get CurrentDisplayWidth() { return this._currentDisplayWidth; }
    get CurrentDisplayHeight() { return this._currentDisplayHeight; }
    CalculateCurrentDisplayType() {
        const displayHeight = $(window).height();
        if (this._currentDisplayHeight !== displayHeight)
            this._currentDisplayHeight = displayHeight;
        const displayWidth = $(window).width();
        if (displayWidth === this._currentDisplayWidth)
            return;
        this._currentDisplayWidth = displayWidth;
        let displayType = display_type_1.DisplayType.Desktop;
        if (displayWidth <= 992)
            displayType = display_type_1.DisplayType.Tablet;
        if (displayWidth <= 768)
            displayType = display_type_1.DisplayType.Phone;
        this._currentDisplayType = displayType;
    }
}
exports.DefaultDisplayService = DefaultDisplayService;
//# sourceMappingURL=default-display-service.js.map