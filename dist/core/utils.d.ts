import { RouteInfo } from "./route-info";
import "n-ext";
export declare class PropertyInfo {
    private _name;
    private _descriptor;
    readonly name: string;
    readonly descriptor: PropertyDescriptor;
    constructor(name: string, descriptor: PropertyDescriptor);
}
export declare class Utils {
    static getPropertyInfos(val: any): Array<PropertyInfo>;
    static createRouteArgs(route: RouteInfo, ctx: any): Array<any>;
}
