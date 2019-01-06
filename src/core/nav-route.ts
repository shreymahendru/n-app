// public
/**
 * Representation of vue-router Route Object (https://router.vuejs.org/api/#route-object-properties)
 */
export interface NavRoute
{
    path: string;
    params: { [index: string]: any };
    query: { [index: string]: any };
    hash: string;
    fullPath: string;
    name?: string;
    redirectedFrom?: string;
}