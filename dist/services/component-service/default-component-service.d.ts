import { ComponentService } from "./component-service";
import { ViewModelRegistration } from "../../core/view-model-registration";
import { ComponentOptions } from "./component-options";
export declare class DefaultComponentService implements ComponentService {
    compile(componentViewModelClass: Function): ComponentOptions;
    create(registration: ViewModelRegistration): ComponentOptions;
}
