export declare class PropertyInfo {
    private _name;
    private _descriptor;
    get name(): string;
    get descriptor(): PropertyDescriptor;
    constructor(name: string, descriptor: PropertyDescriptor);
}
