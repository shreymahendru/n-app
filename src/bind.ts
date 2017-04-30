import "reflect-metadata";
import { given } from "n-defensive";
import "n-ext";


export const bindSymbol = Symbol("bind");

// public
export function bind(...bindings: string[]): Function
{
    given(bindings, "bindings")
        .ensureHasValue()
        .ensure(t => t.length > 0, "cannot be empty");

    return (target: Function) => Reflect.defineMetadata(bindSymbol, bindings, target);
}