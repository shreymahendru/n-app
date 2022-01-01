import { NavigationService } from "./navigation-service";
import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";
import { Utils } from "../../core/utils";


export class DefaultNavigationService implements NavigationService
{
    private readonly _vueRouter: any;
    
    
    public get currentRoutePath(): string { return this._vueRouter.currentRoute.path; }
    public get currentRouteHash(): string { return this.getHash(); }


    public constructor(vueRouter: any)
    {
        given(vueRouter, "vueRouter").ensureHasValue();
        
        this._vueRouter = vueRouter;
        
        
        // the code below is a hack to deal with following error
        // Error: Navigation cancelled from "/runtime/dashboard" to "/runtime/appType/apd_cafdb74cf103485db2a6a2bcfd65ee8d" with a new navigation.
        
        // Solve an error
        const originalPush = this._vueRouter.push;
        const originalReplace = this._vueRouter.replace;
        // push
        this._vueRouter.push = function push(location: any, onResolve: any, onReject: any)
        {
            if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
            return originalPush.call(this, location).catch((err: any) =>
            {
                console.log(err);
                vueRouter.push(location);
            });
        };
        // replace
        this._vueRouter.replace = function push(location: any, onResolve: any, onReject: any)
        {
            if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
            return originalReplace.call(this, location).catch((err: any) =>
            {
                console.log(err);
                vueRouter.replace(location);
            });
        };
    }

    
    public navigate(route: string, params?: object | null, replaceHistory?: boolean): void
    {
        let url = Utils.generateUrl(route, params);
        replaceHistory ? this._vueRouter.replace(url) : this._vueRouter.push(url);
    }
    
    public navigateBack(): void
    {
        this._vueRouter.back();
    }
    
    public navigateForward(): void
    {
        this._vueRouter.forward();
    }


    public navigateSiteSameTab(url: string, replaceHistory?: boolean): void
    {
        given(url, "url").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        url = url.trim();

        replaceHistory ? window.location.replace(url) : window.location.href = url;
    }

    public navigateSiteNewTab(url: string): void
    {
        given(url, "url").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        url = url.trim();
        
        window.open(url);
    }

    public navigateSitePostSameTab(url: string, value: object): void
    {
        given(url, "url").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        url = url.trim();

        let form = this.createForm(url, value);
        form.submit();
    }

    public navigateSitePostNewTab(url: string, value: object): void
    {
        given(url, "url").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        url = url.trim();

        let form = this.createForm(url, value);
        let view = "view" + "_" + Math.floor((Math.random() * 9999999) + 1);
        form.setAttribute("target", view); // to open in a new Tab
        window.open("", view); // to open in new tab
        form.submit();
    }

    public getSiteQueryParam(key: string): string
    {
        given(key, "key").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
        
        key = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        let regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
        let results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }


    private createForm(url: string, value: any): HTMLFormElement
    {
        let form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", url);

        if (value !== undefined && value !== null)
        {
            for (let key in value)
            {
                if (value.hasOwnProperty(key) && typeof value[key] !== "function")
                {
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
    
    private getHash(): string
    {
        let hash: string = this._vueRouter.currentRoute.hash;
        if (!hash || hash.isEmptyOrWhiteSpace())
            return null;
        
        hash = hash.trim();
        if (hash.startsWith("#"))
            hash = hash.substr(1);
        
        return hash.isEmptyOrWhiteSpace() ? null : hash;
    }
}