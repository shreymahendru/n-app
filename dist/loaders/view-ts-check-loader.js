"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-call */
// import { compileToFunctions } from "vue-template-compiler";
const Path = require("path");
// import * as Fs from "fs";
const ts = require("typescript");
const memfs_1 = require("memfs");
function compile(fileNames, options, loaderContext, isView = false) {
    const host = ts.createCompilerHost(options);
    host.writeFile = (fileName, contents) => {
        const dir = Path.dirname(fileName);
        if (!memfs_1.fs.existsSync(dir))
            memfs_1.fs.mkdirSync(dir, { recursive: true });
        memfs_1.fs.writeFileSync(fileName, contents, { encoding: "utf-8" });
    };
    const originalReadFile = host.readFile.bind(host);
    host.readFile = (filename) => {
        // const file = Path.basename(filename);
        // if (file.endsWith("-view-model.temp.ts"))
        //     return MemFs.readFileSync(filename, { encoding: "utf-8" }) as string;
        // if (file.endsWith(".d.ts"))
        // {
        //     if (MemFs.existsSync(filename))
        //         return MemFs.readFileSync(filename, { encoding: "utf-8" }) as string;
        // }
        if (memfs_1.fs.existsSync(filename))
            return memfs_1.fs.readFileSync(filename, { encoding: "utf-8" });
        return originalReadFile(filename);
    };
    const program = ts.createProgram(fileNames, options, host);
    const emitResult = program.emit();
    const allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);
    allDiagnostics.forEach(diagnostic => {
        if (diagnostic.file && fileNames.contains(diagnostic.file.fileName)) {
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            if (isView) {
                const viewFile = Path.basename(diagnostic.file.fileName).replace("-view-model.temp.ts", "-view.html");
                const viewFilePath = Path.join(Path.dirname(diagnostic.file.fileName), viewFile);
                loaderContext.emitError(new Error(`${viewFilePath} : ${message}`));
            }
            else {
                const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
                // console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
                loaderContext.emitError(new Error(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`));
            }
        }
        // else
        // {
        //     console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        // }
    });
    // const exitCode = emitResult.emitSkipped ? 1 : 0;
    // console.error(`Process exiting with code '${exitCode}'.`);
    // process.exit(exitCode);
}
function default_1(src) {
    const filePath = this.resourcePath;
    // console.log("=====start======");
    // console.log(filePath);
    // console.log(src);
    // console.log("=====end======");
    // console.log("=====first-pass-start======");
    const dir = Path.dirname(filePath);
    const file = Path.basename(filePath);
    const viewModelFile = file.replace("-view.html", "-view-model.ts");
    compile([Path.join(dir, viewModelFile)], {
        "module": ts.ModuleKind.CommonJS,
        "moduleResolution": ts.ModuleResolutionKind.NodeJs,
        "target": ts.ScriptTarget.ES2015,
        emitDeclarationOnly: true,
        declaration: true,
        "strict": true,
        "strictNullChecks": true,
        "strictFunctionTypes": true,
        "noImplicitThis": true,
        "noImplicitReturns": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true,
        "noEmitOnError": true,
        "sourceMap": false,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "removeComments": false,
        "forceConsistentCasingInFileNames": false,
        "incremental": false,
        "skipLibCheck": true,
        "importHelpers": true,
        "noEmitHelpers": true,
        "noImplicitOverride": true,
        "pretty": false
    }, this);
    // console.log("=====first-pass-end======");
    // console.log("=====second-pass-start======");
    const declarationFile = file.replace("-view.html", "-view-model.d.ts");
    const declaration = memfs_1.fs.readFileSync(Path.join(dir, declarationFile), "utf8");
    const className = file.replace("-view.html", "").split("-")
        .map(t => t.split("").takeFirst().toUpperCase() + t.split("").skip(1).join(""))
        .join("") + "ViewModel";
    const transformed = src
        .replace("var render = function ()", `var render = function (this: ${className})`)
        .replaceAll("var _vm = this", `var _vm: ${className} = this; var _vm$ = this as any;`)
        .replaceAll("_vm._", "_vm$._")
        .replaceAll("_vm.$", "_vm$.$")
        .replaceAll("render._withStripped", ";(<any>render)._withStripped");
    const combined = `
    ${declaration}
    
    ${transformed}
    `;
    const combinedFile = file.replace("-view.html", "-view-model.temp.ts");
    const combinedFilePath = Path.join(dir, combinedFile);
    memfs_1.fs.writeFileSync(combinedFilePath, combined, { encoding: "utf-8" });
    compile([combinedFilePath], {
        "module": ts.ModuleKind.CommonJS,
        "moduleResolution": ts.ModuleResolutionKind.NodeJs,
        "target": ts.ScriptTarget.ES2015,
        // emitDeclarationOnly: true,
        // declaration: true,
        "strict": true,
        "strictNullChecks": true,
        "strictFunctionTypes": true,
        noImplicitAny: false,
        noImplicitThis: false,
        noImplicitReturns: false,
        noUnusedLocals: false,
        noUnusedParameters: false,
        "noFallthroughCasesInSwitch": false,
        "noEmitOnError": true,
        noEmit: true,
        "sourceMap": false,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "removeComments": false,
        "forceConsistentCasingInFileNames": false,
        "incremental": false,
        "skipLibCheck": true,
        "importHelpers": true,
        "noEmitHelpers": true,
        "noImplicitOverride": true,
        "pretty": false
    }, this, true);
    // console.log("=====second-pass-end======");
    // const result = compileToFunctions(src);
    // console.log(JSON.stringify((<any>result.render)[0]));
    return src;
    // const done = this.async();
    // // @ts-expect-error: unsafe use of this
    // const options = getOptions(this) || {};
    // // @ts-expect-error: unsafe use of this
    // const publicPath = getPublicPath(options, this);
    // // @ts-expect-error: unsafe use of this
    // this.cacheable();
    // try
    // {
    //     console.log(src);
    //     done(null, await evalDependencyGraph({
    //         // @ts-expect-error: unsafe use of this
    //         loaderContext: this,
    //         src,
    //         // @ts-expect-error: unsafe use of this
    //         filename: this.resourcePath,
    //         publicPath
    //     }));
    // }
    // catch (error)
    // {
    //     done(error);
    // }
}
exports.default = default_1;
//# sourceMappingURL=view-ts-check-loader.js.map