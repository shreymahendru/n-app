import "reflect-metadata";
import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";


export const templateSymbol = Symbol("template");

// public
export function template(template: string): Function
{
    given(template, "template")
        .ensureHasValue()
        .ensure(t => !t.isEmptyOrWhiteSpace());

    return (target: Function) => Reflect.defineMetadata(templateSymbol, template.trim(), target);
}

