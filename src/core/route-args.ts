import { RouteInfo } from "./route-info";
import { HttpException } from "./http-exception";
import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";


export class RouteArgs
{
    private readonly _pathArgs: object;
    private readonly _queryArgs: object;
    private readonly _routeArgs: Array<any>;
    
    
    public get pathArgs(): object { return this._pathArgs; }
    public get queryArgs(): object { return this._queryArgs; }
    public get routeArgs(): Array<any> { return this._routeArgs; }
    
    
    public constructor(pathArgs: object, queryArgs: object, routeArgs: Array<any>)
    {
        given(pathArgs, "pathArgs").ensureHasValue().ensureIsObject();
        given(queryArgs, "queryArgs").ensureHasValue().ensureIsObject();
        given(routeArgs, "routeArgs").ensureHasValue().ensureIsArray();
        
        this._pathArgs = pathArgs;
        this._queryArgs = queryArgs;
        this._routeArgs = routeArgs;
    }
    
    
    public equals(comparison: RouteArgs): boolean
    {
        let current = this.createParamsArray(this);
        let compare = this.createParamsArray(comparison);
        
        return current.equals(compare);
    }
    
    
    public static create(route: RouteInfo, ctx: any): RouteArgs
    {
        // console.log("ctx", ctx);
        
        let queryArgs = Object.assign({}, ctx.query);
        let pathArgs = Object.assign({}, ctx.params);
        let model: { [index: string]: any } = {};

        for (let key in queryArgs)
        {
            let routeParam = route.findRouteParam(key);
            if (routeParam)
            {
                let parsed = routeParam.parseParam(queryArgs[key]);
                model[routeParam.paramKey] = parsed;
                queryArgs[key] = parsed;
            }
            else
            {
                let value: string = queryArgs[key];
                if (value === undefined || value == null || value.isEmptyOrWhiteSpace() || value.trim().toLowerCase() === "null")
                    queryArgs[key] = null;
            }
        }

        for (let key in pathArgs)
        {
            let routeParam = route.findRouteParam(key);
            // if (!routeParam)
            //     throw new HttpException(404);

            // instead we just skip it. This is because keys in pathParams will include parent page route pathParams

            if (!routeParam)
                continue;

            let parsed = routeParam.parseParam(pathArgs[key]);
            model[routeParam.paramKey] = parsed;
            pathArgs[key] = parsed;
        }

        let routeArgs = [];
        for (let routeParam of route.params)
        {
            let value = model[routeParam.paramKey];
            if (value === undefined || value === null)
            {
                if (!routeParam.isOptional)
                    throw new HttpException(404);

                value = null;
            }
            routeArgs.push(value);
        }
        
        return new RouteArgs(pathArgs, queryArgs, routeArgs);
    }
    
    
    private createParamsArray(routeArgs: RouteArgs): Array<[string, any]>
    {
        let obj: Object = Object.assign({}, routeArgs._pathArgs, routeArgs._queryArgs);
        let params = new Array<[string, any]>();
        for (let key in obj)
            params.push([key, obj.getValue(key)]);
        return params.orderBy(t => t[0]);
    }
}