import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";
import { ComponentViewModel, ComponentViewModelClass } from "./component-view-model.js";
import { PageViewModel, PageViewModelClass } from "./page-view-model.js";


export const templateSymbol = Symbol.for("@nivinjoseph/n-app/template");

// public
export function template<This extends (PageViewModel | ComponentViewModel)>(template: string | RenderInfo): TemplateViewModelDecorator<This>
{
    given(template, "template").ensureHasValue();

    if (typeof template === "string")
        given(template, "template").ensureIsString();
    else
        given(template, "template").ensureIsObject();


    const decorator: TemplateViewModelDecorator<This> = (target, context) =>
    {
        given(context, "context")
            // @ts-expect-error chill
            .ensure(t => t.kind === "class", "template decorator should only be used on a class");

        const className = context.name!;
        given(className, className).ensureHasValue().ensureIsString()
            .ensure(_ => target.prototype instanceof PageViewModel || target.prototype instanceof ComponentViewModel, `class '${className}' decorated with template must extend PageViewModel ot ComponentViewModel class`);

        context.metadata[templateSymbol] = template;
    };

    return decorator;
}


export type RenderInfo = { render: Function; staticRenderFns: Array<Function>; };


export type TemplateDecoratorTarget<This extends (ComponentViewModel | PageViewModel)> = This extends ComponentViewModel
    ? ComponentViewModelClass<This>
    : This extends PageViewModel ? PageViewModelClass<This>
    : never;

export type TemplateDecoratorContext<This extends (ComponentViewModel | PageViewModel)> = This extends ComponentViewModel
    ? ClassDecoratorContext<ComponentViewModelClass<This>>
    : This extends PageViewModel ? ClassDecoratorContext<PageViewModelClass<This>>
    : never;


export type TemplateViewModelDecorator<This extends (ComponentViewModel | PageViewModel)> = (
    target: TemplateDecoratorTarget<This>,
    context: TemplateDecoratorContext<This>
) => void;