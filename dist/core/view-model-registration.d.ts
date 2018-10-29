import "@nivinjoseph/n-ext";
export declare class ViewModelRegistration {
    private readonly _name;
    private readonly _viewModel;
    private readonly _template;
    readonly name: string;
    readonly viewModel: Function;
    readonly template: string;
    constructor(viewModel: Function);
}
