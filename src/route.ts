import "reflect-metadata";
import { given } from "n-defensive";
import "n-ext";

export const appRouteSymbol = Symbol("appRoute");

// public
export function route(route: string): Function
{
    given(route, "route").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());

    return (target: Function) => Reflect.defineMetadata(appRouteSymbol, route.trim(), target);
}