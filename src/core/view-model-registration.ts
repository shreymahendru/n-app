import { given } from "n-defensive";
import "n-ext";
import { viewSymbol } from "./view";
import { templateSymbol } from "./template";
import { ApplicationException } from "n-exception";


export class ViewModelRegistration
{
    private readonly _name: string;
    private readonly _viewModel: Function;
    private readonly _template: string;
    private readonly _view: string;
    private readonly _templateId: string;
    
    
    public get name(): string { return this._name; }
    public get viewModel(): Function { return this._viewModel; }
    public get template(): string { return this._template; }
    public get templateId(): string { return this._templateId; }
    
    
    public constructor(viewModel: Function)
    {
        given(viewModel, "viewModel").ensureHasValue();
        
        this._name = (<Object>viewModel).getTypeName();
        this._viewModel = viewModel;
        
        if (Reflect.hasOwnMetadata(templateSymbol, this._viewModel))
            this._template = Reflect.getOwnMetadata(templateSymbol, this._viewModel);
        else
        {
            if (!Reflect.hasOwnMetadata(viewSymbol, this._viewModel))
                throw new ApplicationException(`ViewModel'${this._name}' does not have @template or @view applied.`);

            this._view = Reflect.getOwnMetadata(viewSymbol, this._viewModel); // does not have to include .html extension
            this._templateId = this.generateTemplateId();
        }
    }
    
    
    private generateTemplateId(): string
    {
        let templateId = this._view.replace(".html", "").split("-").join("");
        
        if (document.getElementById(templateId) == null)
            throw new ApplicationException(`Template with id ${templateId} not found for ViewModel ${this._name}`);    
        
        return "#" + templateId;
    }
}