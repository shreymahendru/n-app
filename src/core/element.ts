import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";
import { ComponentViewModel, ComponentViewModelClass } from "./component-view-model.js";

export const elementSymbol = Symbol.for("@nivinjoseph/n-app/element");

// public
export function element<This extends ComponentViewModel>(elementName: string): ElementComponentViewModelDecorator<This>
{
    given(elementName, "elementName").ensureHasValue().ensureIsString();

    const decorator: ElementComponentViewModelDecorator<This> = (target, context) =>
    {
        given(context, "context")
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            .ensure(t => t.kind === "class", "element decorator should only be used on a class");

        const className = context.name!;
        given(className, className).ensureHasValue().ensureIsString()
            .ensure(_ => target.prototype instanceof ComponentViewModel, `class '${className}' decorated with element must extend ComponentViewModel class`);

        context.metadata[elementSymbol] = elementName;
    };

    return decorator;
}


export type ElementComponentViewModelDecorator<This extends ComponentViewModel> = (
    target: ComponentViewModelClass<This>,
    context: ClassDecoratorContext<ComponentViewModelClass<This>>
) => void;