import "@nivinjoseph/n-ext";
export declare abstract class ViewModelRegistration {
    private readonly _name;
    private readonly _viewModel;
    private readonly _template;
    readonly name: string;
    readonly viewModel: Function;
    readonly template: string;
    protected constructor(viewModel: Function);
}
