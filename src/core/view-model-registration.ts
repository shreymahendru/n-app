import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";
import { viewSymbol } from "./view";
import { templateSymbol } from "./template";
import { ApplicationException } from "@nivinjoseph/n-exception";


export abstract class ViewModelRegistration
{
    // private readonly _typeName: string;
    private readonly _viewModel: Function;
    private readonly _template: string;
    private readonly _view: string;
    private readonly _templateId: string;
    
    public name: string;
    // public get name(): string { return this._typeName; }
    public get viewModel(): Function { return this._viewModel; }
    public get template(): string { return this._template; }
    public get templateId(): string { return this._templateId; }
    
    
    protected constructor(viewModel: Function)
    {
        given(viewModel, "viewModel").ensureHasValue();
        
        this.name = (<Object>viewModel).getTypeName().trim().split("").join("");
        console.log("VIEW MODEL REGISTRATION", this.name);
        this._viewModel = viewModel;
        
        if (Reflect.hasOwnMetadata(templateSymbol, this._viewModel))
            this._template = Reflect.getOwnMetadata(templateSymbol, this._viewModel);
        else
        {
            if (!Reflect.hasOwnMetadata(viewSymbol, this._viewModel))
                throw new ApplicationException(`ViewModel'${this.name}' does not have @template or @view applied.`);

            this._view = Reflect.getOwnMetadata(viewSymbol, this._viewModel); // does not have to include .html extension
            this._templateId = this.generateTemplateId();
        }
    }
    
    
    private generateTemplateId(): string
    {
        let templateId = this._view.replace(".html", "").split("-").join("");
        
        if (document.getElementById(templateId) == null)
            throw new ApplicationException(`Template with id ${templateId} not found for ViewModel ${this.name}`);    
        
        return "#" + templateId;
    }
}