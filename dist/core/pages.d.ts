import "reflect-metadata";
import { PageViewModel } from "./page-view-model";
export declare const pagesSymbol: unique symbol;
export declare function pages(...pages: Array<new (...params: any[]) => PageViewModel>): Function;
