import "reflect-metadata";
import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";


export const bindSymbol = Symbol.for("@nivinjoseph/n-app/bind");

// public
export function bind(...bindings: ReadonlyArray<string>): Function
{
    given(bindings, "bindings").ensureHasValue().ensureIsArray()
        .ensure(t => t.isNotEmpty, "cannot be empty");

    return (target: Function) => Reflect.defineMetadata(bindSymbol, bindings, target);
}