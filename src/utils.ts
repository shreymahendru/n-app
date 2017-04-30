import { RouteInfo } from "./route-info";
import { HttpException } from "./http-exception";
import "n-ext";

export class PropertyInfo
{
    private _name: string;
    private _descriptor: PropertyDescriptor;


    public get name(): string { return this._name; }
    public get descriptor(): PropertyDescriptor { return this._descriptor; }


    public constructor(name: string, descriptor: PropertyDescriptor)
    {
        this._name = name;
        this._descriptor = descriptor;
    }
} 


export class Utils
{
    public static getPropertyInfos(val: any): Array<PropertyInfo>
    {
        let propertyInfos = new Array<PropertyInfo>();
        let prototype = Object.getPrototypeOf(val);
        if (prototype === undefined || prototype === null)  // we are dealing with Object
            return propertyInfos;

        let propertyNames = Object.getOwnPropertyNames(val);
        for (let name of propertyNames)
        {
            if (name === "constructor" || name.indexOf("_") === 0)
                continue;

            let descriptor = Object.getOwnPropertyDescriptor(val, name);
            propertyInfos.push(new PropertyInfo(name, descriptor));
        }

        propertyInfos.push(...Utils.getPropertyInfos(prototype));
        return propertyInfos;
    }
    
    public static createRouteArgs(route: RouteInfo, ctx: any): Array<any>
    {
        let pathParams = ctx.params ? ctx.params : {};
        let queryParams = ctx.query ? ctx.query : {};
        let model: { [index: string]: any } = {};

        for (let param of route.params)
        {
            let lookupKey = param.paramKey.trim().toLowerCase();
            let value = null;
            if (param.isQuery)
            {
                for (let key in queryParams)
                {
                    if (key.trim().toLowerCase() === lookupKey)
                    {
                        value = param.parseParam(queryParams[key]);
                        break;
                    }    
                }
                
                if (value === undefined || value === null)
                {
                    if (!param.isOptional)
                        throw new HttpException(404);
                    
                    value = null;
                }    
            }
            else
            {
                for (let key in pathParams)
                {
                    if (key.trim().toLowerCase() === lookupKey)
                    {
                        value = param.parseParam(pathParams[key]);
                        break;
                    }
                }

                if (value === undefined || value === null)
                    throw new HttpException(404);
            }
            
            model[param.paramKey] = value;
        }    

        
        // for (let key in queryParams)
        // {
        //     let routeParam = route.findRouteParam(key);
        //     if (!routeParam)
        //         continue;

        //     model[routeParam.paramKey] = routeParam.parseParam(queryParams[key]);
        // }

        // for (let key in pathParams) // this wont work in multi level nesting
        // {
        //     let routeParam = route.findRouteParam(key);
        //     if (!routeParam)
        //         throw new HttpException(404);

        //     model[routeParam.paramKey] = routeParam.parseParam(pathParams[key]);
        // }

        let result = [];
        for (let param of route.params.orderBy(t => t.order))
        {
            let value = model[param.paramKey];
            // if (value === undefined || value === null)
            // {
            //     if (!param.isOptional)
            //         throw new HttpException(404);

            //     value = null;
            // }
            result.push(value);
        }

        return result;
    }
}






