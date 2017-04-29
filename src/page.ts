import { given } from "n-defensive";
import { PageRegistration } from "./page-registration";
import { Container } from "n-ject";
import { Utils } from "./utils";


export class Page
{
    private readonly _segment: string;
    private _parent: Page;
    private readonly _children = new Array<Page>();
    private _registration: PageRegistration;


    public get segment(): string { return this._segment; }
    public get parent(): Page { return this._parent; }
    public get children(): ReadonlyArray<Page> { return this._children.map(t => t); }
    public get registration(): PageRegistration { return this._registration; }


    public constructor(segment: string, parent: Page)
    {
        given(segment, "segment").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        this._segment = segment;
        if (parent)
            this.changeParent(parent);
    }


    public attachRegistration(registration: PageRegistration)
    {
        given(registration, "registration").ensureHasValue();
        this._registration = registration;
    }

    public addChild(childPage: Page): void
    {
        given(childPage, "childPage").ensureHasValue();
        this._children.push(childPage);
    }

    public removeChild(childPage: Page): void
    {
        given(childPage, "childPage").ensureHasValue()
            .ensure(t => this._children.some(u => u === t), "child not present");

        this._children.remove(childPage);
    }

    public changeParent(parent: Page): void
    {
        if (this._parent) this._parent.removeChild(this);
        this._parent = parent;
        if (this._parent) this._parent.addChild(this);
    }
    
    public createVueRouterRoute(container: Container): any
    {
        let vueRouterRoute: any = {
            path: this.createRoute(),
            component: this.createComponent(container)
        };
        
        if (this._children.length > 0)
            vueRouterRoute.children = this._children.map(t => t.createVueRouterRoute(container));
        
        return vueRouterRoute;
    }
    
    
    private createRoute(): string
    {
        let route = this._registration.route.vueRoute;
        if (!this._parent)
            return route;
        
        route = route.replace(this._parent.registration.route.vueRoute, "");
        if (route.startsWith("/"))
            route = route.substr(1);
        
        return route;
    }
    
    private createComponent(container: Container): any
    {
        let registration = this._registration;

        let component = {
            template: registration.templateId,
            beforeRouteEnter(to: any, from: any, next: any)
            {
                // called before the route that renders this component is confirmed.
                // does NOT have access to `this` component instance,
                // because it has not been created yet when this guard is called!

                console.log("executing beforeRouteEnter");
                // console.log("to", to);
                // console.log("from", from);
                // console.log("next", next);
                // console.log("this", this);

                next();
            },
            beforeRouteUpdate(to: any, from: any, next: any)
            {
                // called when the route that renders this component has changed,
                // but this component is reused in the new route.
                // For example, for a route with dynamic params /foo/:id, when we
                // navigate between /foo/1 and /foo/2, the same Foo component instance
                // will be reused, and this hook will be called when that happens.
                // has access to `this` component instance.

                console.log("executing beforeRouteUpdate");
                // console.log("to", to);
                // console.log("from", from);
                // console.log("next", next);
                // console.log("this", this);

                next();
            },
            beforeRouteLeave(to: any, from: any, next: any)
            {
                // called when the route that renders this component is about to
                // be navigated away from.
                // has access to `this` component instance.

                console.log("executing beforeRouteLeave");
                // console.log("to", to);
                // console.log("from", from);
                // console.log("next", next);
                // console.log("this", this);

                next();
            },
            // beforeRouteUpdate: function (to: any, from: any, next: any)
            // {
            //     // react to route changes...
            //     // don't forget to call next()
            //     console.log("executing before route update");
            //     console.log("to", to);
            //     console.log("from", from);
            //     console.log("next", next);
            //     console.log("this", this);

            //     next();
            // },
            data: function ()
            {
                console.log("executing data");

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
        
        return component;
    }
}