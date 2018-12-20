import "reflect-metadata";
export declare const authorizeSymbol: unique symbol;
export declare function authorize(...authorizers: Array<string | Function>): Function;
