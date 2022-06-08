import { element, bind, ComponentViewModel, template } from "./../../../../src/index";
import "./binding-test-view.scss";


@template(require("./binding-test-view.html"))
@element("binding-test")
@bind({"model": "string"})   
export class BindingTestViewModel extends ComponentViewModel
{
    public get fooVal(): string { return this.getBoundModel(); }
    public set fooVal(value: string) { this.setBoundModel(value); }
    
    
    protected override onCreate(): void
    {
        console.log("binding test on create");
        
        super.onCreate();
    }
}