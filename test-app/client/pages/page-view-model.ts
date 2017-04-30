import "n-ext";


export class PageViewModel
{
    public constructor()
    {
        console.log("Instantiating {0}".format((<Object>this).getTypeName()));
    }

    public onEnter(arg: any): void
    {
        console.log("Entering {0}".format((<Object>this).getTypeName()));
        console.log("arg", arg);
    }

    public onLeave(): void
    {
        console.log("Leaving {0}".format((<Object>this).getTypeName()));
    }
}