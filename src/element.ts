import "reflect-metadata";
import { given } from "n-defensive";
import "n-ext";

export const elementSymbol = Symbol("element");

// public
export function element(elementName: string): Function
{
    given(elementName, "elementName").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());

    return (target: Function) => Reflect.defineMetadata(elementSymbol, elementName, target);
}