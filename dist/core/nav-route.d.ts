export interface NavRoute {
    path: string;
    params: {
        [index: string]: any;
    };
    query: {
        [index: string]: any;
    };
    hash: string;
    fullPath: string;
    name?: string;
    redirectedFrom?: string;
}
