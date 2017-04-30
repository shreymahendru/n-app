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
    }

    protected onLeave(): void
    {
        console.log("Leaving {0}".format((<Object>this).getTypeName()));
    }
}