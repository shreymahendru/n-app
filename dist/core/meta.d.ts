import "reflect-metadata";
import "@nivinjoseph/n-ext";
export declare const metaSymbol: unique symbol;
export declare function meta(...metas: Array<{
    name: string;
    content: string;
}>): Function;
