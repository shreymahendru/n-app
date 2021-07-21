import * as Path from "path";

// tslint:disable-next-line: no-default-export
export default function (content: string)
{
    const dirPath = this.context as string;
    const filePath = this.resourcePath as string;
    // const relativeFilePath = "./" + Path.relative(this.rootContext, this.resourcePath).replace(/^(\.\.[\/\\])+/, "");
    const fileName = filePath.replace(dirPath + Path.sep, "");
    
    const isJs = fileName.endsWith(".js");

    const className = fileName.replace(isJs ? ".js" : ".ts", "").split("-").map(t => `${t[0].toUpperCase()}${t.substring(1)}`).join("");
    
    const componentCode = `
        ${className}.___$typeName = "${className}";
        
        exports.${className} = ${className};
    `;

    content = content.replace(`exports.${className} = ${className};`, componentCode);
    
    return content;
}