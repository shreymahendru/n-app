import "@nivinjoseph/n-ext";
export declare class ViewModelRegistration {
    private readonly _name;
    private readonly _viewModel;
    private readonly _template;
    private readonly _view;
    private readonly _templateId;
    readonly name: string;
    readonly viewModel: Function;
    readonly template: string;
    readonly templateId: string;
    constructor(viewModel: Function);
    private generateTemplateId();
}
