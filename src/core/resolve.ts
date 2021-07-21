import "reflect-metadata";
import { NavRoute } from "./nav-route";
import { given } from "@nivinjoseph/n-defensive";
import { Utils } from "./utils";



export const resolveSymbol = Symbol("resolve");

// public
export function resolve(...resolvers: Array<Function>): Function
{
    given(resolvers, "resolvers").ensureHasValue().ensureIsArray().ensure(t => t.length > 0);
    
    const mapped = resolvers.map(t =>
    {
        return {
            name: Utils.getTypeName(t),
            value: t
        }; 
    });

    return (target: Function) => Reflect.defineMetadata(resolveSymbol, mapped, target);
}

// public
export interface Resolution
{
    redirect?: string;
    value?: any;
}

// public
export interface Resolver
{
    resolve(from: NavRoute, to: NavRoute): Promise<Resolution>;
}