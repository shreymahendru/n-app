import "@nivinjoseph/n-ext";
declare type RenderInfo = {
    render: Function;
    staticRenderFns: Array<Function>;
};
export declare class ViewModelRegistration {
    private readonly _name;
    private readonly _viewModel;
    private readonly _template;
    private readonly _components;
    get name(): string;
    get viewModel(): Function;
    get template(): string | RenderInfo;
    get components(): ReadonlyArray<Function>;
    constructor(viewModel: Function);
}
export {};
