import { given } from "n-defensive";


// public
export class ComponentViewModel
{    
    private _executeOnCreate: () => void;
    private _executeOnDestroy: () => void;
    
    
    protected get ctx(): any { return (<any>this)["_ctx"]; }
    
    
    protected onCreate(): void
    { 
        if (this._executeOnCreate)
            this._executeOnCreate();      
    }
    
    protected onDestroy(): void
    { 
        if (this._executeOnDestroy)
            this._executeOnDestroy();    
    }
    
    protected executeOnCreate(funcToExecute: () => void): void
    {
        given(funcToExecute, "funcToExecute").ensureHasValue();
        this._executeOnCreate = funcToExecute;
    }
    
    protected executeOnDestroy(funcToExecute: () => void): void
    {
        given(funcToExecute, "funcToExecute").ensureHasValue();
        this._executeOnDestroy = funcToExecute;
    }
}