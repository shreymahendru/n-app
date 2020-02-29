import "@nivinjoseph/n-ext";
const hash = require("hash-sum");
// import * as Fs from "fs";
// const compiler = require("vue-template-compiler");
// const transpile = require("vue-template-es2015-compiler");

// @ts-ignore
// tslint:disable-next-line: no-default-export
export default function (content: string, map: any, meta: any)
{
    // const options = getOptions(this);

    // validateOptions(schema, options, 'Example Loader');

    // Apply some transformations to the source...

    // return `export default ${JSON.stringify(source)}`;

    // console.log("vue compiler start");
    // console.log("context: ", this.context);

    const dirPath = this.context as string;
    const filePath = this.resourcePath as string;

    // if (!dirPath.contains("/client/") || !dirPath.contains("/src/components"))
    //     return null;

    let fileName = filePath.replace(dirPath + "/", "");

    if (content.contains(`var __decorate = (this && this.__decorate)`))
    {
        // console.warn(fileName);
        // console.log(content);   
        
        const id = hash(fileName);

        const hotReloadAPIPath = JSON.stringify(require.resolve("vue-hot-reload-api"));
        // const vuePath = JSON.stringify(require.resolve("@nivinjoseph/vue"));

        // const genTemplateHotReloadCode = (id: any, request: any) =>
        // {
        //     return `
        //             module.hot.accept(${request}, function () {
        //             api.rerender('${id}', {
        //                 render: render,
        //                 staticRenderFns: staticRenderFns
        //             })
        //             })
        //         `.trim();
        // };
        // // @ts-ignore
        // const genHotReloadCode = (id: any, functional: any, templateRequest: any) =>
        // {
        //     return `
        //             /* hot reload */
        //             if (module.hot) {
        //             var api = require(${hotReloadAPIPath})
        //             api.install(require(${vuePath}))
        //             if (api.compatible) {
        //                 module.hot.accept()
        //                 if (!api.isRecorded('${id}')) {
        //                 api.createRecord('${id}', component.options)
        //                 } else {
        //                 api.${functional ? "rerender" : "reload"}('${id}', component.options)
        //                 }
        //                 ${templateRequest ? genTemplateHotReloadCode(id, templateRequest) : ""}
        //             }
        //             }
        //             `.trim();
        // };
        
        


        // const templateFileName = fileName.replace("-view-model.js", "-view.html");

        const className = fileName.replace(".js", "").split("-").map(t => `${t[0].toUpperCase()}${t.substring(1)}`).join("");
        console.warn(className);

        
        const hotReloadCode = `
            ${className}.___initHotReload = function (componentOptions) {
                if(module.hot)
                {
                    console.log('is Hot');
                    const api = require(${hotReloadAPIPath});
                    api.install(require('@nivinjoseph/vue'));
                    
                    if (!api.compatible) 
                        throw new Error('vue-hot-reload-api is not compatible with the version of Vue you are using.');
                    
                    module.hot.accept();
                    
                    if (!module.hot.data) 
                    {
                        api.createRecord('${id}', componentOptions);
                        console.log("creating record", "${id}");
                    }
                    else 
                    {
                        api.reload('${id}', componentOptions);
                        console.log("updating record", "${id}");
                    }
                }
            };
            
            exports.${className} = ${className};
        `;
        
        content = content.replace(`exports.${className} = ${className};`, hotReloadCode);
        
        
        
        // TODO: 2
        // const code = `
        //     const __template__ = require("./${templateFileName}");
        //     console.log("template is this ==>", __template__);
        //     const __templateInfo__ = require("vue-loader/lib/loaders/templateLoader.js!./${templateFileName}");
        //     ${className}.___render = __templateInfo__.render;
        //     ${className}.___staticRenderFns = __templateInfo__.staticRenderFns;
        //     exports.${className} = ${className};
        // `;

        // content = content.replace(`exports.${className} = ${className};`, code);

        // TODO: 1
        // const template = Fs.readFileSync(dirPath + "/" + templateFileName, "utf8");

        // const compiled = compiler.compile(template);
        // if (compiled.errors && compiled.errors.length)
        // {
        //     // 2.6 compiler outputs errors as objects with range
        //     if (compiler.generateCodeFrame)
        //     {
        //         // TODO account for line offset in case template isn't placed at top
        //         // of the file
        //         this.emitError(
        //             `\n\n  Errors compiling template:\n\n` +
        //             // @ts-ignore
        //             compiled.errors.map(({ msg, start, end }) =>
        //             {
        //                 const frame = compiler.generateCodeFrame(template, start, end);
        //                 return `  ${msg}\n\n${pad(frame)}`;
        //             }).join(`\n\n`) +
        //             "\n"
        //         );
        //     }
        //     else
        //     {
        //         this.emitError(
        //             `\n  Error compiling template:\n${pad(compiled.source)}\n` +
        //             compiled.errors.map((e: any) => `  - ${e}`).join("\n") +
        //             "\n"
        //         );
        //     }
        // }

        // const className = fileName.replace(".js", "").split("-").map(t => `${t[0].toUpperCase()}${t.substring(1)}`).join("");
        // console.warn(className);

        // const toFunction = (code: string) =>
        // {
        //     return `function () {${code}}`;
        // };

        // const code = transpile(`var __render__ = ${toFunction(compiled.render)};\n` +
        //     `var __staticRenderFns__ = [${compiled.staticRenderFns.map(toFunction)}];`) + `\n`;

        // content = content.replace(`exports.${className} = ${className};`,
        //     `
        //         ${code};
        //         ${className}.___render = __render__;
        //         ${className}.___staticRenderFns = __staticRenderFns__;
        //         exports.${className} = ${className};
        // `);
    }


    // let scriptFileName = "";
    // let templateFileName = "";
    // let styleFileName = "";

    // let script = "";
    // let template = "";
    // let style = "";


    // if (fileName.endsWith(".js"))
    // {
    //     scriptFileName = fileName;
    //     templateFileName = fileName.replace("-view-model.js", "-view.html");
    //     styleFileName = fileName.replace("-view-model.js", "-view.scss");

    //     script = content;
    //     template = Fs.readFileSync(dirPath + "/" + templateFileName, "utf8");
    //     style = Fs.readFileSync(dirPath + "/" + styleFileName, "utf8");
    // }
    // else if (fileName.endsWith(".html"))
    // {
    //     scriptFileName = fileName.replace("-view.html", "-view-model.js");
    //     templateFileName = fileName;
    //     styleFileName = fileName.replace("-view.html", "-view.scss");

    //     script = Fs.readFileSync(dirPath + "/" + scriptFileName, "utf8");
    //     template = content;
    //     style = Fs.readFileSync(dirPath + "/" + styleFileName, "utf8");
    // }
    // else if (fileName.endsWith(".scss"))
    // {
    //     scriptFileName = fileName.replace("-view.scss", "-view-model.js");
    //     templateFileName = fileName.replace("-view.scss", "-view.html");
    //     styleFileName = fileName;

    //     script = Fs.readFileSync(dirPath + "/" + scriptFileName, "utf8");
    //     template = Fs.readFileSync(dirPath + "/" + templateFileName, "utf8");
    //     style = content;
    //     // console.log(styleFileName, content);
    // }
    // else
    // {
    //     throw new Error(`Unknown file type '${fileName}'`);
    // }


    // const sfc = `
    //     <template>
    //         ${template}
    //     </template>

    //     <script>
    //         ${script}
    //     </script>

    //     <style lang="scss">
    //         ${style}
    //     </style>
    // `;

    // console.log("dirPath: ", dirPath);
    // console.log("filePath: ", filePath);
    // console.log("fileName", fileName);

    // console.log(typeof content, content);
    // console.log(typeof map, map);
    // console.log(typeof meta, meta);

    // console.log(sfc);

    // console.log("vue compiler end");

    // return sfc;

    // console.log(content);

    return content;
}

// function pad(source: string)
// {
//     return source
//         .split(/\r?\n/)
//         .map(line => `  ${line}`)
//         .join("\n");
// }