import "n-ext";
export declare class ViewModelRegistration {
    private readonly _name;
    private readonly _viewModel;
    private readonly _view;
    private readonly _templateId;
    readonly name: string;
    readonly viewModel: Function;
    readonly templateId: string;
    constructor(viewModel: Function);
    private generateTemplateId();
}
