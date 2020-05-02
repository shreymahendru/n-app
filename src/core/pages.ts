import "reflect-metadata";
import { given } from "@nivinjoseph/n-defensive";
import { PageViewModel } from "./page-view-model";


export const pagesSymbol = Symbol("pages");

// public
export function pages(...pages: Array<new (...params: any[]) => PageViewModel>): Function
{
    given(pages, "pages").ensureHasValue().ensureIsArray().ensure(t => t.length > 0);

    return (target: Function) => Reflect.defineMetadata(pagesSymbol, pages, target);
}