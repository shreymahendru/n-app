import "reflect-metadata";
import "@nivinjoseph/n-ext";


export const persistSymbol = Symbol("persist");

// public
export function persist(): Function
{
    return (target: Function) => Reflect.defineMetadata(persistSymbol, true, target);
}