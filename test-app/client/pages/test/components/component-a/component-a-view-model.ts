import { bind, ComponentViewModel, element, template } from "../../../../../../src";
import "./component-a-view.scss";

@template(require("./component-a-view.html"))
@element("component-a")
@bind({ num: "number" })
export class ComponentAViewModel extends ComponentViewModel
{
    
    public get value(): number { return this.getBound("num"); }
    
    protected override onCreate(): void
    {
        super.onCreate();
        
        console.log("component A on create");
    }
    
    protected override onMount(element: HTMLElement): void
    {
        super.onMount(element);
        
        console.log("component A on mount");
    }
}