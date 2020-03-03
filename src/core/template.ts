import "reflect-metadata";
import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";


export const templateSymbol = Symbol("template");

// public
export function template(template: object): Function
{
    given(template, "template")
        .ensureHasValue().ensureIsObject();
        
    // console.dir(template);

    return (target: Function) => Reflect.defineMetadata(templateSymbol, template, target);
}

