import "@nivinjoseph/n-ext";
// import * as Fs from "fs";
// const compiler = require("vue-template-compiler");
// const transpile = require("vue-template-es2015-compiler");

// @ts-ignore
// tslint:disable-next-line: no-default-export
export default function (content: string, map: any, meta: any)
{
    return content.substring(`module.exports = "`.length, content.length - 2);
}