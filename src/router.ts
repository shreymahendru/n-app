import { given } from "n-defensive";
import { Container } from "n-ject";
import { PageRegistration } from "./page-registration";
import { ApplicationException } from "n-exception";
import { Utils } from "./utils";


export class Router
{
    private readonly _vueRouter: any;
    private readonly _container: Container;
    private readonly _registrations = new Array<PageRegistration>();
    private _vueRouterInstance: any;
    
    
    public get vueRouterInstance(): any { return this._vueRouterInstance; }
    
    
    public constructor(vueRouter: any, container: Container)
    {
        given(vueRouter, "vueRouter").ensureHasValue();
        given(container, "container").ensureHasValue();
        this._vueRouter = vueRouter;
        this._container = container;
    }
    
    
    public registerPages(...pageViewModelClasses: Function[]): void
    {
        for (let item of pageViewModelClasses)
            this.registerPage(item);    
    }
    
    public bootstrap(): void
    {
        if (this._registrations.length === 0)
            return;
        
        let routes = new Array<any>();
        const container = this._container;
        
        for (let registration of this._registrations)
        {
            let component = {
                template: registration.templateId,
                data: function ()
                {
                    let vueVm = this;
                    let vm = container.resolve(registration.name);
                    let data = { vm: vm };
                    let methods: { [index: string]: any } = {};
                    let computed: { [index: string]: any } = {};

                    let propertyInfos = Utils.getPropertyInfos(vm);
                    for (let info of propertyInfos)
                    {
                        if (typeof (info.descriptor.value) === "function")
                            methods[info.name] = info.descriptor.value.bind(vm);
                        else if (info.descriptor.get || info.descriptor.set)
                        {
                            computed[info.name] = {
                                get: info.descriptor.get ? info.descriptor.get.bind(vm) : undefined,
                                set: info.descriptor.set ? info.descriptor.set.bind(vm) : undefined
                            };
                        }
                    }

                    vueVm.$options.methods = methods;
                    vueVm.$options.computed = computed;

                    return data;
                }
            };
            
            let route = {
                path: registration.route.vueRoute,
                component: component
            };
            
            routes.push(route);
        }
        
        let r = this._vueRouter;
        this._vueRouterInstance = new r({ routes: routes });
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
}