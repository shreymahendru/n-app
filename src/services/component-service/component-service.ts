import { ComponentOptions } from "./component-options";

// public
export interface ComponentService
{
    compile(componentViewModelClass: Function): ComponentOptions;
}