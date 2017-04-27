import { given } from "n-defensive";
import { Container } from "n-ject";
import { PageRegistration } from "./page-registration";
import { ApplicationException } from "n-exception";


export class Router
{
    private readonly _vue: any;
    private readonly _container: Container;
    private readonly _registrations = new Array<PageRegistration>();
    
    
    public constructor(vue: any, container: Container)
    {
        given(vue, "vue").ensureHasValue();
        given(container, "container").ensureHasValue();
        this._vue = vue;
        this._container = container;
    }
    
    
    public registerPages(...pageViewModelClasses: Function[]): void
    {
        for (let item of pageViewModelClasses)
            this.registerPage(item);    
    }
    
    public bootstrap(): void
    {
        // for (let item of this._registrations)
        //     this.bootstrapPage(item);
    }
    
    
    private registerPage(pageViewModelClass: Function): void
    {
        let registration = new PageRegistration(pageViewModelClass);

        if (this._registrations.some(t => t.name === registration.name))
            throw new ApplicationException(`Duplicate Page registration with name '${registration.name}'.`);

        if (this._registrations.some(t => t.route === registration.route))
            throw new ApplicationException(`Duplicate Page registration with route '${registration.route}'`);

        this._registrations.push(registration);
        this._container.registerTransient(registration.name, registration.viewModel);
    }
    
    // private bootstrapPage(registration: PageRegistration): void
    // {
        
    // }
}