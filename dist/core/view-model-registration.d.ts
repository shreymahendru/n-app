import "@nivinjoseph/n-ext";
export declare class ViewModelRegistration {
    private readonly _name;
    private readonly _viewModel;
    private readonly _template;
    get name(): string;
    get viewModel(): Function;
    get template(): string;
    constructor(viewModel: Function);
}
