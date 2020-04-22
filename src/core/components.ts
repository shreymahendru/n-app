import "reflect-metadata";
import { given } from "@nivinjoseph/n-defensive";
import { ComponentViewModel } from "./component-view-model";


export const componentsSymbol = Symbol("components");

// public
export function components(...components: Array<new (...params: any[]) => ComponentViewModel>): Function
{
    given(components, "components").ensureHasValue().ensureIsArray().ensure(t => t.length > 0);

    return (target: Function) => Reflect.defineMetadata(componentsSymbol, components, target);
}