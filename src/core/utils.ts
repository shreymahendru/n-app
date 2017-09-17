import { RouteInfo } from "./route-info";
import { given } from "n-defensive";


// public
export abstract class Utils // static class
{
    public static generateUrl(route: string, params?: object): string
    {
        given(route, "route").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        
        route = route.trim();
        let url = params === undefined || params === null ? route : new RouteInfo(route).generateUrl(params);
        return url.replaceAll(" ", "");
    }
}