import "@nivinjoseph/n-ext";
import { given } from "@nivinjoseph/n-defensive";
import { ComponentViewModel, ComponentViewModelClass } from "./component-view-model.js";
import { PageViewModel, PageViewModelClass } from "./page-view-model.js";


export const persistSymbol = Symbol.for("@nivinjoseph/n-app/persist");

// public
export function persist<This extends (ComponentViewModel | PageViewModel)>(target: PersistDecoratorTarget<This>, context: PersistDecoratorContext<This>): void
{
    given(context, "context")
        // @ts-expect-error chill
        .ensure(t => t.kind === "class", "persist decorator should only be used on a class");

    const className = context.name!;
    given(className, className).ensureHasValue().ensureIsString()
        .ensure(_ => target.prototype instanceof PageViewModel || target.prototype instanceof ComponentViewModel, `class '${className}' decorated with persist must extend PageViewModel ot ComponentViewModel class`);

    context.metadata[persistSymbol] = true;
}




export type PersistDecoratorTarget<This extends (ComponentViewModel | PageViewModel)> = This extends ComponentViewModel
    ? ComponentViewModelClass<This>
    : This extends PageViewModel ? PageViewModelClass<This>
    : never;

export type PersistDecoratorContext<This extends (ComponentViewModel | PageViewModel)> = This extends ComponentViewModel
    ? ClassDecoratorContext<ComponentViewModelClass<This>>
    : This extends PageViewModel ? ClassDecoratorContext<PageViewModelClass<This>>
    : never;
