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