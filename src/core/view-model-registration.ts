import { given } from "@nivinjoseph/n-defensive";
import { ApplicationException } from "@nivinjoseph/n-exception";
import "@nivinjoseph/n-ext";
import { ClassDefinition } from "@nivinjoseph/n-util";
import { ComponentViewModel, ComponentViewModelClass } from "./component-view-model.js";
import { componentsSymbol } from "./components.js";
import { PageViewModelClass } from "./page-view-model.js";
import { persistSymbol } from "./persist.js";
import { RenderInfo, templateSymbol } from "./template.js";
import { Utils } from "./utils.js";


export class ViewModelRegistration
{
    private readonly _name: string;
    private readonly _viewModel: PageViewModelClass<any> | ComponentViewModelClass<any>;
    private readonly _template: string | RenderInfo;
    private readonly _components: ReadonlyArray<ClassDefinition<ComponentViewModel>> | null = null;
    private readonly _persist: boolean;

    private _isCreated = false;


    public get name(): string { return this._name; }
    public get viewModel(): PageViewModelClass<any> | ComponentViewModelClass<any> { return this._viewModel; }
    public get template(): string | RenderInfo { return this._template; }
    public get components(): ReadonlyArray<ComponentViewModelClass<any>> | null { return this._components; }
    public get persist(): boolean { return this._persist; }

    public get isCreated(): boolean { return this._isCreated; }


    public constructor(viewModel: PageViewModelClass<any> | ComponentViewModelClass<any>)
    {
        given(viewModel, "viewModel").ensureHasValue().ensureIsFunction();

        this._name = Utils.getTypeName(viewModel);
        if (!this._name.endsWith("ViewModel"))
            throw new ApplicationException(`Registered ViewModel '${this._name}' violates ViewModel naming convention.`);

        this._viewModel = viewModel;

        const metadata = viewModel[Symbol.metadata];

        if (metadata == null) // if metadata object is null/undefined that means there were no decorators applied
            throw new ApplicationException(`ViewModel '${this._name}' does not have @template applied.`);

        const template = metadata[templateSymbol] as string | RenderInfo | undefined;
        if (template == null)
            throw new ApplicationException(`ViewModel '${this.name}' does not have @template applied.`);

        this._template = template;

        const components = metadata[componentsSymbol] as ReadonlyArray<ClassDefinition<ComponentViewModel>> | undefined;
        if (components != null)
            this._components = components;

        const shouldPersist = metadata[persistSymbol] as boolean | undefined;
        if (shouldPersist)
            this._persist = true;
        else
            this._persist = false;
    }

    public created(): void
    {
        this._isCreated = true;
    }


    // public reload(viewModel: Function): void
    // {
    //     given(viewModel, "viewModel").ensureHasValue();

    //     this._name = (" " + (<Object>viewModel).getTypeName().trim()).substr(1); // Shrey: Safari de-optimization
    //     if (!this._name.endsWith("ViewModel"))
    //         throw new ApplicationException(`Registered ViewModel '${this._name}' violates ViewModel naming convention.`);

    //     this._viewModel = viewModel;

    //     if (!Reflect.hasOwnMetadata(templateSymbol, this._viewModel))
    //         throw new ApplicationException(`ViewModel'${this.name}' does not have @template applied.`);

    //     this._template = Reflect.getOwnMetadata(templateSymbol, this._viewModel);
    // }
}