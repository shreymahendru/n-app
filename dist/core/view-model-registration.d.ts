import "@nivinjoseph/n-ext";
declare type RenderInfo = {
    render: Function;
    staticRenderFns: Array<Function>;
};
export declare class ViewModelRegistration {
    private readonly _name;
    private readonly _viewModel;
    private readonly _template;
    get name(): string;
    get viewModel(): Function;
    get template(): string | RenderInfo;
    constructor(viewModel: Function);
}
export {};
