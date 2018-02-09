import { PageRegistration } from "./page-registration";
import { Container } from "@nivinjoseph/n-ject";
export declare class Page {
    private readonly _segment;
    private _parent;
    private readonly _children;
    private _registration;
    readonly segment: string;
    readonly parent: Page;
    readonly children: ReadonlyArray<Page>;
    readonly registration: PageRegistration;
    constructor(segment: string, parent: Page);
    attachRegistration(registration: PageRegistration): void;
    addChild(childPage: Page): void;
    removeChild(childPage: Page): void;
    changeParent(parent: Page): void;
    createVueRouterRoute(container: Container): any;
    private createRoute();
}
