import { given } from "@nivinjoseph/n-defensive";
import { Page } from "./page";
import { PageRegistration } from "./page-registration";


export class PageTreeBuilder
{
    private readonly _root: Page;
    private readonly _registrations: ReadonlyArray<PageRegistration>;


    public constructor(root: Page, pageRegistrations: ReadonlyArray<PageRegistration>)
    {
        given(root, "root").ensureHasValue();
        given(pageRegistrations, "pageRegistrations").ensureHasValue();
        this._root = root;
        this._registrations = pageRegistrations;
    }


    public build(): ReadonlyArray<Page>
    {
        this.buildTree();
        return this.shakeTree();
    }

    
    private buildTree(): void
    {
        for (let registration of this._registrations)
        {
            let currentNode = this._root;

            for (let segment of registration.route.pathSegments)
            {
                if (segment === currentNode.segment)
                    continue;

                let node = currentNode.children.find(t => t.segment === segment);
                if (!node)
                    node = new Page(segment, currentNode);

                currentNode = node;
            }

            currentNode.attachRegistration(registration);
        }
    }

    private shakeTree(): ReadonlyArray<Page>
    {
        let nodesToProcess = new Array<Page>();
        // skip root
        nodesToProcess.push(...this._root.children);

        while (nodesToProcess.length > 0)
        {
            let currentNode = nodesToProcess.shift();
            let children = currentNode.children;
            if (!currentNode.registration)
            {
                for (let child of children)
                    child.changeParent(currentNode.parent);
            }

            nodesToProcess.push(...children);
        }
        
        if (this._root.registration)
            return [this._root];
        
        let children = this._root.children;
        for (let child of children)
            child.changeParent(null);

        return children;        
    }
}