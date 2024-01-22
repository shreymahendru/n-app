import { PageRegistration } from "./page-registration.js";
import { RouteArgs } from "./route-args.js";
import type { Scope } from "@nivinjoseph/n-ject";
import { given } from "@nivinjoseph/n-defensive";
import { Utilities } from "./utilities.js";
import { ApplicationException } from "@nivinjoseph/n-exception";
import { type ComponentOptions, type Ref, type UnwrapRef, inject, provide, ref } from "vue";
import { PageViewModel } from "./page-view-model.js";
import type { ComponentViewModel } from "./component-view-model.js";


export class PageComponentFactory
{
    public create(registration: PageRegistration): Object
    {
        given(registration, "registration").ensureHasValue();

        const setDocumentMetadata = (): void =>
        {
            if (registration.title)
                window.document.title = registration.title;

            registration.metadata.forEach((metadata) =>
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                $(`meta[${metadata.$key}="${metadata[metadata.$key]}"]`).remove();

                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                $("head").append(`<meta ${Object.keys(metadata).where(t => t !== "$key").map(t => `${t}="${metadata[t]}"`).join(" ")}>`);
            });
        };


        const component: ComponentOptions = {
            name: registration.name,

            setup: function <T extends ComponentViewModel>(): { nAppVm: Ref<UnwrapRef<T>>; }
            {
                let container: Scope | undefined = inject("rootScopeContainer");
                if (container == null)
                    throw new ApplicationException("Could not get pageScopeContainer or rootScopeContainer.");

                container = registration.persist ? container : container.createScope(); // page scope

                const nAppVm = container.resolve<T>(registration.name);

                provide("pageScopeContainer", container);

                return {
                    nAppVm: ref(nAppVm)
                };
            },

            beforeCreate: function <T extends PageViewModel>()
            {
                // console.log("beforeCreate for ", registration.name, this);

                const vm = this.nAppVm as T;

                const methods: { [index: string]: Function; } = {};
                const computed: { [index: string]: { get?(): any; set?(val: any): void; }; } = {};

                const propertyInfos = Utilities.getPropertyInfos(vm);
                for (const info of propertyInfos)
                {
                    if (typeof info.descriptor.value === "function")
                        methods[info.name] = (info.descriptor.value as Function).bind(vm);
                    else if (info.descriptor.get || info.descriptor.set)
                    {
                        computed[info.name] = {
                            get: info.descriptor.get ? info.descriptor.get.bind(vm) : undefined,
                            set: info.descriptor.set ? info.descriptor.set.bind(vm) : undefined
                        };
                    }
                }

                this.$options.methods = methods;
                this.$options.computed = computed;

                (<any>vm)._ctx = this;
            },

            created: function () 
            {
                if (this.nAppVm.onCreate) // TODO: why would the vm not have onCreate?
                {
                    if (registration.persist && registration.isCreated)
                    {
                        // no op
                    }
                    else
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        this.nAppVm.onCreate();
                }

                registration.created();
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            beforeMount: function ()
            {
                // console.log("beforeMount for ", registration.name, this);
            },
            mounted: function ()
            {
                // console.log("mounted for ", registration.name, this);

                if (this.nAppVm.onMount)
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    this.nAppVm.onMount(this.$el);
            },
            beforeUpdate: function ()
            {
                // console.log("beforeUpdate for ", registration.name, this);
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            updated: function ()
            {
                // console.log("updated for ", registration.name, this);
            },
            beforeUnmount: function ()
            {
                // console.log("beforeUnmount for ", registration.name, this);

                if (this.nAppVm.onDismount)
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    this.nAppVm.onDismount();
            },
            unmounted: function ()
            {
                // console.log("unmounted for ", registration.name, this);

                if (this.nAppVm.onDestroy && !registration.persist)
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    this.nAppVm.onDestroy();

                this.nAppVm._ctx.$options.methods = null;
                this.nAppVm._ctx.$options.computed = null;
                // this.vm._ctx = null;
                this.nAppVm = null;
            },
            data: function (vm)
            {
                // console.log("data", vm);
                // don't need this here but exposing it so we can check the properties 
                // when using vue dev tools in the browsers.
                return {
                    vm: vm.nAppVm
                };
            }
        };

        if (typeof registration.template === "string")
            component.template = registration.template;
        else
            component.render = registration.template.render;





        /* The Full Navigation Resolution Flow
                Navigation triggered
                Call leave guards in deactivated components
                Call global beforeEach guards
                Call beforeRouteUpdate guards in reused components (2.2+)
                Call beforeEnter in route configs
                Resolve async route components
                Call beforeRouteEnter in activated components
                Call global beforeResolve guards (2.5+)
                Navigation confirmed.
                Call global afterEach hooks.
                DOM updates triggered.
                Call callbacks passed to next in beforeRouteEnter guards with instantiated instances.
         */

        component.beforeRouteEnter = function (to: any, _from: any, next: Function): void
        {
            // called before the route that renders this component is confirmed.
            // does NOT have access to `this` component instance,
            // because it has not been created yet when this guard is called!

            let routeArgs: RouteArgs | null = null;

            try 
            {
                routeArgs = RouteArgs.create(registration.route, to);
            }
            catch (error)
            {
                console.error(error);
                next(false);
                return;
            }

            setDocumentMetadata();
            next((vueModel: any) =>
            {
                setDocumentMetadata();
                const vm = vueModel.nAppVm;
                vm.__routeArgs = routeArgs;
                // console.log("invoked on enter", routeArgs);

                // if ((<any>module).hot)
                //     PageHmrHelper.track(registration, routeArgs!);

                if (vm.onEnter)
                    if (routeArgs!.routeArgs.isNotEmpty)
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        vm.onEnter(...routeArgs!.routeArgs,
                            ...registration.resolvedValues ? registration.resolvedValues : []
                        );
                    else
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        vm.onEnter();
            });
        };

        component.beforeRouteUpdate = function (to: any, from: any, next: Function): void
        {
            // called when the route that renders this component has changed,
            // but this component is reused in the new route.
            // For example, for a route with dynamic params /foo/:id, when we
            // navigate between /foo/1 and /foo/2, the same Foo component instance
            // will be reused, and this hook will be called when that happens.
            // has access to `this` component instance.

            let routeArgs: RouteArgs | null = null;
            try 
            {
                routeArgs = RouteArgs.create(registration.route, to);
            }
            catch (error)
            {
                console.error(error);
                next(false);
                return;
            }

            let fromRouteArgs: RouteArgs | null = null;
            try 
            {
                fromRouteArgs = RouteArgs.create(registration.route, from);
            }
            catch (error) 
            {
                console.error(error);
                fromRouteArgs = new RouteArgs({}, {}, []);
            }

            if (routeArgs.equals(fromRouteArgs))
            {
                setDocumentMetadata();
                next();
                return;
            }

            const vm = this.nAppVm;
            if (vm.onLeave)    
            {
                try 
                {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    vm.onLeave();
                }
                catch (error)
                {
                    next(false);
                    return;
                }
            }

            vm.__routeArgs = routeArgs;
            // console.log("invoked on update", routeArgs);
            // if ((<any>module).hot)
            //     PageHmrHelper.track(registration, routeArgs);

            if (vm.onEnter)
                if (routeArgs.routeArgs.length > 0)
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    vm.onEnter(...routeArgs.routeArgs,
                        ...registration.resolvedValues ? registration.resolvedValues : []
                    );
                else
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    vm.onEnter();

            setDocumentMetadata();
            next();
        };

        component.beforeRouteLeave = function (_to: any, _from: any, next: Function): void
        {
            // called when the route that renders this component is about to
            // be navigated away from.
            // has access to `this` component instance.

            const vm = this.nAppVm;
            if (vm.onLeave)
            {
                try 
                {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    vm.onLeave();
                }
                catch (error)
                {
                    next(false);
                    return;
                }
            }

            next();
        };

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return component;
    }
}