import "reflect-metadata";


export const authorizeSymbol = Symbol("authorize");

// public
export function authorize(...authorizers: Array<string | Function>): Function
{
    const formatted = authorizers.map(t =>
    {
        if (typeof (t) === "string")
            return t.trim();
        
        return (" " + (<Object>t).getTypeName().trim()).substr(1); // Shrey: Safari de-optimization
    });
    
    return (target: Function) => Reflect.defineMetadata(authorizeSymbol, formatted, target);
}