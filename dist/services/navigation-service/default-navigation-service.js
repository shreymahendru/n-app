"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
const utils_1 = require("../../core/utils");
class DefaultNavigationService {
    get currentRoutePath() { return this._vueRouter.currentRoute.path; }
    get currentRouteHash() { return this.getHash(); }
    constructor(vueRouter) {
        n_defensive_1.given(vueRouter, "vueRouter").ensureHasValue();
        this._vueRouter = vueRouter;
    }
    navigate(route, params, replaceHistory) {
        let url = utils_1.Utils.generateUrl(route, params);
        replaceHistory ? this._vueRouter.replace(url) : this._vueRouter.push(url);
    }
    navigateBack() {
        this._vueRouter.back();
    }
    navigateForward() {
        this._vueRouter.forward();
    }
    navigateSiteSameTab(url, replaceHistory) {
        n_defensive_1.given(url, "url").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        url = url.trim();
        replaceHistory ? window.location.replace(url) : window.location.href = url;
    }
    navigateSiteNewTab(url) {
        n_defensive_1.given(url, "url").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        url = url.trim();
        window.open(url);
    }
    navigateSitePostSameTab(url, value) {
        n_defensive_1.given(url, "url").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        url = url.trim();
        let form = this.createForm(url, value);
        form.submit();
    }
    navigateSitePostNewTab(url, value) {
        n_defensive_1.given(url, "url").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        url = url.trim();
        let form = this.createForm(url, value);
        let view = "view" + "_" + Math.floor((Math.random() * 9999999) + 1);
        form.setAttribute("target", view);
        window.open("", view);
        form.submit();
    }
    getSiteQueryParam(key) {
        n_defensive_1.given(key, "key").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
        key = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        let regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
        let results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    createForm(url, value) {
        let form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", url);
        if (value !== undefined && value !== null) {
            for (let key in value) {
                if (value.hasOwnProperty(key) && typeof value[key] !== "function") {
                    let val = value[key];
                    let hiddenField = document.createElement("input");
                    hiddenField.setAttribute("type", "hidden");
                    hiddenField.setAttribute("name", key);
                    hiddenField.setAttribute("value", val);
                    form.appendChild(hiddenField);
                }
            }
        }
        document.body.appendChild(form);
        return form;
    }
    getHash() {
        let hash = this._vueRouter.currentRoute.hash;
        if (!hash || hash.isEmptyOrWhiteSpace())
            return null;
        hash = hash.trim();
        if (hash.startsWith("#"))
            hash = hash.substr(1);
        return hash.isEmptyOrWhiteSpace() ? null : hash;
    }
}
exports.DefaultNavigationService = DefaultNavigationService;
//# sourceMappingURL=default-navigation-service.js.map