export class PropertyInfo
{
    private _name: string;
    private _descriptor: PropertyDescriptor;


    public get name(): string { return this._name; }
    public get descriptor(): PropertyDescriptor { return this._descriptor; }


    public constructor(name: string, descriptor: PropertyDescriptor)
    {
        this._name = name;
        this._descriptor = descriptor;
    }
} 


export class Utils
{
    public static getPropertyInfos(val: any): Array<PropertyInfo>
    {
        let propertyInfos = new Array<PropertyInfo>();
        let prototype = Object.getPrototypeOf(val);
        if (prototype === undefined || prototype === null)  // we are dealing with Object
            return propertyInfos;

        let propertyNames = Object.getOwnPropertyNames(val);
        for (let name of propertyNames)
        {
            if (name === "constructor" || name.indexOf("_") === 0)
                continue;

            let descriptor = Object.getOwnPropertyDescriptor(val, name);
            propertyInfos.push(new PropertyInfo(name, descriptor));
        }

        propertyInfos.push(...Utils.getPropertyInfos(prototype));
        return propertyInfos;
    }
}






