"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NScrollContainerViewModel = void 0;
const tslib_1 = require("tslib");
require("simplebar/dist/simplebar.css");
const SimpleBar = require("simplebar");
const template_1 = require("../../core/template");
const element_1 = require("../../core/element");
const bind_1 = require("../../core/bind");
const component_view_model_1 = require("../../core/component-view-model");
require("./n-scroll-container-view.scss");
const n_util_1 = require("@nivinjoseph/n-util");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
let NScrollContainerViewModel = class NScrollContainerViewModel extends component_view_model_1.ComponentViewModel {
    constructor() {
        super(...arguments);
        this._sb = null;
    }
    get isHorizontalOnly() { return !!n_util_1.TypeHelper.parseBoolean(this.getBound("onlyX")); }
    get isVerticalOnly() { return !!n_util_1.TypeHelper.parseBoolean(this.getBound("onlyY")); }
    get myRenderKey() { return this.getBound("renderKey"); }
    get _hugBottom() { return !!n_util_1.TypeHelper.parseBoolean(this.getBound("hugBottom")); }
    get _hugRight() { return !!n_util_1.TypeHelper.parseBoolean(this.getBound("hugRight")); }
    onCreate() {
        n_defensive_1.given(this, "this").ensure(t => !(t.isHorizontalOnly === true && t.isVerticalOnly === true), "only-x and only-y cannot both be true");
        super.onCreate();
    }
    onMount(element) {
        super.onMount(element);
        const SimpleBarCtor = SimpleBar.default;
        this._sb = new SimpleBarCtor(element.querySelector(".simple-scroll-viewer-scroll-container"), { autoHide: true });
        this.watch("myRenderKey", (v, ov) => {
            if (v == null || v === ov)
                return;
            this._sb.recalculate();
            setTimeout(() => {
                if (this._hugBottom)
                    this._sb.getScrollElement().scrollTop = this._sb.getScrollElement().scrollHeight;
                if (this._hugRight)
                    this._sb.getScrollElement().scrollLeft = this._sb.getScrollElement().scrollWidth;
            }, 150);
        });
    }
    onDestroy() {
        if (this._sb != null) {
            // this._sb.unMount();
            this._sb = null;
        }
        this.unWatch("myRenderKey");
        super.onDestroy();
    }
};
NScrollContainerViewModel = tslib_1.__decorate([
    template_1.template(require("./n-scroll-container-view.html")),
    element_1.element("n-scroll-container"),
    bind_1.bind("onlyX", "onlyY", "renderKey", "hugBottom", "hugRight")
], NScrollContainerViewModel);
exports.NScrollContainerViewModel = NScrollContainerViewModel;
//# sourceMappingURL=n-scroll-container-view-model.js.map