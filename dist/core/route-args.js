"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteArgs = void 0;
const http_exception_1 = require("./http-exception");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
class RouteArgs {
    constructor(pathArgs, queryArgs, routeArgs) {
        n_defensive_1.given(pathArgs, "pathArgs").ensureHasValue().ensureIsObject();
        n_defensive_1.given(queryArgs, "queryArgs").ensureHasValue().ensureIsObject();
        n_defensive_1.given(routeArgs, "routeArgs").ensureHasValue().ensureIsArray();
        this._pathArgs = pathArgs;
        this._queryArgs = queryArgs;
        this._routeArgs = routeArgs;
    }
    get pathArgs() { return this._pathArgs; }
    get queryArgs() { return this._queryArgs; }
    get routeArgs() { return this._routeArgs; }
    equals(comparison) {
        let current = this.createParamsArray(this);
        let compare = this.createParamsArray(comparison);
        return current.equals(compare);
    }
    static create(route, ctx) {
        let queryArgs = Object.assign({}, ctx.query);
        let pathArgs = Object.assign({}, ctx.params);
        let model = {};
        for (let key in queryArgs) {
            let routeParam = route.findRouteParam(key);
            if (routeParam) {
                let parsed = routeParam.parseParam(queryArgs[key]);
                model[routeParam.paramKey] = parsed;
                queryArgs[key] = parsed;
            }
            else {
                let value = queryArgs[key];
                if (value === undefined || value == null || value.isEmptyOrWhiteSpace() || value.trim().toLowerCase() === "null")
                    queryArgs[key] = null;
            }
        }
        for (let key in pathArgs) {
            let routeParam = route.findRouteParam(key);
            if (!routeParam)
                continue;
            let parsed = routeParam.parseParam(pathArgs[key]);
            model[routeParam.paramKey] = parsed;
            pathArgs[key] = parsed;
        }
        let routeArgs = [];
        for (let routeParam of route.params) {
            let value = model[routeParam.paramKey];
            if (value === undefined || value === null) {
                if (!routeParam.isOptional)
                    throw new http_exception_1.HttpException(404);
                value = null;
            }
            routeArgs.push(value);
        }
        return new RouteArgs(pathArgs, queryArgs, routeArgs);
    }
    createParamsArray(routeArgs) {
        let obj = Object.assign({}, routeArgs._pathArgs, routeArgs._queryArgs);
        let params = new Array();
        for (let key in obj)
            params.push([key, obj.getValue(key)]);
        return params.orderBy(t => t[0]);
    }
}
exports.RouteArgs = RouteArgs;
//# sourceMappingURL=route-args.js.map