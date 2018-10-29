import { given } from "@nivinjoseph/n-defensive";
import { ComponentService } from "./component-service";
import { ViewModelRegistration } from "../../core/view-model-registration";
import { Scope } from "@nivinjoseph/n-ject";
import { ApplicationException } from "@nivinjoseph/n-exception";
import { Utilities } from "../../core/utilities";
import { ComponentOptions } from "./component-options";


export class DefaultComponentService implements ComponentService
{
    public compile(componentViewModelClass: Function): ComponentOptions
    {
        given(componentViewModelClass, "componentViewModelClass").ensureHasValue().ensureIsFunction();

        const registration = new ViewModelRegistration(componentViewModelClass);

        return this.create(registration);
    }


    public create(registration: ViewModelRegistration): ComponentOptions
    {
        given(registration, "registration").ensureHasValue();

        const component: any = {};

        component.template = registration.template;

        component.inject = ["pageScopeContainer", "rootScopeContainer"];

        component.data = function ()
        {
            let vueVm = this;

            const container: Scope = vueVm.pageScopeContainer || vueVm.rootScopeContainer;
            if (!container)
                throw new ApplicationException("Could not get pageScopeContainer or rootScopeContainer.");
            let vm = container.resolve<any>(registration.name);

            let data = { vm: vm };
            let methods: { [index: string]: any } = {};
            let computed: { [index: string]: any } = {};

            let propertyInfos = Utilities.getPropertyInfos(vm);
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
            vm._ctx = vueVm;
            vm._bindings = [];

            return data;
        };


        component.beforeCreate = function ()
        {
            // console.log("executing beforeCreate");
            // console.log(this.vm);
        };

        component.created = function ()
        {
            // console.log("executing created");
            // console.log(this.vm);

            if (this.vm.onCreate)
                this.vm.onCreate();
        };

        component.beforeMount = function ()
        {
            // console.log("executing beforeMount");
            // console.log(this.vm);
        };

        component.mounted = function ()
        {
            // console.log("executing mounted");
            // console.log(this.vm);

            if (this.vm.onMount)
                this.vm.onMount(this.$el);
        };

        component.beforeUpdate = function ()
        {
            // console.log("executing beforeUpdate");
            // console.log(this.vm);
        };

        component.updated = function ()
        {
            // console.log("executing updated");
            // console.log(this.vm);
        };

        component.beforeDestroy = function ()
        {
            // console.log("executing beforeDestroy");
            // console.log(this.vm);
        };

        component.destroyed = function ()
        {
            // console.log("executing destroyed");
            // console.log(this.vm);

            if (this.vm.onDestroy)
                this.vm.onDestroy();
        };

        return component;
    }
}