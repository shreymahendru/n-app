import "reflect-metadata";
import { given } from "n-defensive";
import "n-ext";

// public
export const viewSymbol = Symbol("clientView");

// public
export function view(file: string): Function
{
    given(file, "file")
        .ensureHasValue()
        .ensure(t => !t.isEmptyOrWhiteSpace());
    
    return (target: Function) => Reflect.defineMetadata(viewSymbol, file.trim(), target);
}

