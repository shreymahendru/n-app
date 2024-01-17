import { given } from "@nivinjoseph/n-defensive";
import { ComponentViewModelClass } from "./component-view-model.js";
import { PageViewModel, PageViewModelClass } from "./page-view-model.js";


export const componentsSymbol = Symbol.for("@nivinjoseph/n-app/components");

// public
export function components<This extends PageViewModel>(...components: [ComponentViewModelClass<any>, ...Array<ComponentViewModelClass<any>>]): ComponentsPageViewModelDecorator<This>
{
    const decorator: ComponentsPageViewModelDecorator<This> = (target, context) =>
    {
        given(context, "context")
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            .ensure(t => t.kind === "class", "components decorator should only be used on a class");

        // TODO: Change this so this can be used with ComponentViewModel as well
        const className = context.name!;
        given(className, className).ensureHasValue().ensureIsString()
            .ensure(_ => target.prototype instanceof PageViewModel, `class '${className}' decorated with components must extend PageViewModel class`);

        context.metadata[componentsSymbol] = components;
    };

    return decorator;
}




export type ComponentsPageViewModelDecorator<This extends PageViewModel> = (
    target: PageViewModelClass<This>,
    context: ClassDecoratorContext<PageViewModelClass<This>>
) => void;