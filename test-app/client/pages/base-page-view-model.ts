import "n-ext";
import { PageViewModel } from "../../../src/index";


export class BasePageViewModel extends PageViewModel
{
    public constructor()
    {
        super();
        console.log("Instantiating {0}".format((<Object>this).getTypeName()));
    }

    protected onEnter(arg: any): void
    {
        console.log("Entering {0}".format((<Object>this).getTypeName()));
        console.log("arg", arg);
        console.log("pathArgs", this.pathArgs);
        console.log("queryArgs", this.queryArgs);
    }

    protected onLeave(): void
    {
        console.log("Leaving {0}".format((<Object>this).getTypeName()));
    }
}