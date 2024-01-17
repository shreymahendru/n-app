import { given } from "@nivinjoseph/n-defensive";
import { PageViewModel, PageViewModelClass } from "./page-view-model.js";


export const pagesSymbol = Symbol.for("@nivinjoseph/n-app/pages");

// public
export function pages<This extends PageViewModel>(...pages: readonly [PageViewModelClass<any>, ...ReadonlyArray<PageViewModelClass<any>>]): PagesPageViewModelDecorator<This>
{
    given(pages, "pages").ensureHasValue().ensureIsArray().ensure(t => t.isNotEmpty)
        .ensure(t => t.every(t => t instanceof PageViewModel));

    const decorator: PagesPageViewModelDecorator<This> = (target, context) =>
    {
        given(context, "context")
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            .ensure(t => t.kind === "class", "pages decorator should only be used on a class");

        const className = context.name!;
        given(className, className).ensureHasValue().ensureIsString()
            .ensure(_ => target.prototype instanceof PageViewModel, `class '${className}' decorated with pages must extend PageViewModel class`);

        context.metadata[pagesSymbol] = pages;
    };

    return decorator;
}



export type PagesPageViewModelDecorator<This extends PageViewModel> = (
    target: PageViewModelClass<This>,
    context: ClassDecoratorContext<PageViewModelClass<This>>
) => void;