import "@nivinjoseph/n-ext";
declare type RenderInfo = {
    render: Function;
    staticRenderFns: Array<Function>;
};
export declare class ViewModelRegistration {
    private _name;
    private _viewModel;
    private _template;
    get name(): string;
    get viewModel(): Function;
    get template(): string | RenderInfo;
    constructor(viewModel: Function);
    reload(viewModel: Function): void;
}
export {};
