/* eslint-disable @typescript-eslint/no-unsafe-call */
// import { compileToFunctions } from "vue-template-compiler";
import * as Path from "path";
import * as Fs from "fs";
import * as ts from "typescript";
import { LoaderContext } from "webpack";
import { fs as MemFs } from "memfs";
import { given } from "@nivinjoseph/n-defensive";
const getOptions = require("loader-utils").getOptions;

let globalComponentElementTypeCache: Map<string, { schema: string; filePath: string; }> | null = null;

const declarationCompileConfig = {
    "module": ts.ModuleKind.CommonJS,
    "moduleResolution": ts.ModuleResolutionKind.NodeJs,
    "target": ts.ScriptTarget.ES2015,
    emitDeclarationOnly: true,
    declaration: true,
    strict: false,
    strictNullChecks: false,
    strictFunctionTypes: false,
    noImplicitAny: false,
    noImplicitThis: false,
    noImplicitReturns: false,
    noUnusedLocals: false,
    noUnusedParameters: false,
    noFallthroughCasesInSwitch: false,
    noEmitOnError: false,
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
};

const combinedCompileConfig = {
    "module": ts.ModuleKind.CommonJS,
    "moduleResolution": ts.ModuleResolutionKind.NodeJs,
    "target": ts.ScriptTarget.ES2015,
    // emitDeclarationOnly: true,
    // declaration: true,
    strict: false,
    strictNullChecks: false,
    strictFunctionTypes: false,
    noImplicitAny: false,
    noImplicitThis: false,
    noImplicitReturns: false,
    noUnusedLocals: false,
    noUnusedParameters: false,
    noFallthroughCasesInSwitch: false,
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
};


module.exports = function (this: LoaderContext<any>, src: string): string
{    
    // console.log("Ts-check loading", this.resourcePath);
    // console.log(globalComponentElementTypeCache);
    
    // const callback = this.async();
    
    const options = (getOptions(this) || {}) as Record<string, unknown>;
    const isDebug = !!options.debug;
    let debugFiles = options.debugFiles as Array<string> | null ?? [];
    given(debugFiles, "debugFiles").ensureHasValue().ensureIsArray();
    debugFiles = debugFiles.map(t => Path.join(Path.dirname(t), Path.basename(t).split(".").takeFirst()));
    
    const filePath = this.resourcePath;
    const dir = Path.dirname(filePath);
    const file = Path.basename(filePath);
    const viewModelFile = file.replace("-view.html", "-view-model.ts");
    
    if (!dir.contains("node_modules"))
        compile(isDebug, debugFiles, [Path.join(dir, viewModelFile)], declarationCompileConfig, this);
    
    const declarationFile = file.replace("-view.html", "-view-model.d.ts");
    
    const declaration = dir.contains("node_modules")
        ? Fs.readFileSync(Path.join(dir, declarationFile), "utf8")
        : MemFs.readFileSync(Path.join(dir, declarationFile), "utf8");
    
    const className = file.replace("-view.html", "").split("-")
        .map(t => t.split("").takeFirst().toUpperCase() + t.split("").skip(1).join(""))
        .join("") + "ViewModel";
    
    const staticRenderFnsKey = "var staticRenderFns =";
    let [renderFn, staticRenderFns] = src.split(staticRenderFnsKey);
    staticRenderFns = staticRenderFnsKey + staticRenderFns;
    
    const extracts = new Array<{ element: string; variable: string; value: string; }>();
        
    [...globalComponentElementTypeCache!.keys()]
        .forEach(key =>
        {
            let instanceCount = 0;
            // console.log("key", key);
            const syntax = `_c(${key}, {`;
            const modifiedSyntax = `_c(${key} + "", {`;
            let fileAddedAsDependency = false;
            while (renderFn.contains(syntax))
            {
                if (!fileAddedAsDependency)
                {
                    this.addDependency(globalComponentElementTypeCache!.get(key)!.filePath);
                    fileAddedAsDependency = true;
                }
                
                instanceCount++;
                const index = renderFn.indexOf(syntax);
                const attrsIndex = renderFn.indexOf("attrs:", index);
                if (attrsIndex < 0 || (attrsIndex - index - syntax.length) > 15)
                {
                    // console.log("not valid attrs");
                    renderFn = renderFn.replace(syntax, modifiedSyntax);
                    continue;
                }
                
                const split = renderFn.split("");
                const before = split.take(attrsIndex);
                const after = split.skip(attrsIndex);
                // const afterMod = after.replace("attrs:", `attrs:<${globalComponentElementTypeCache.get(key)}>`);
                // console.log(afterMod);
                // transformed = before.replace(syntax, modifiedSyntax) + afterMod;
                
                let curlyCount = 0;
                let endValue = 0;
                const toExtract = after.skip("attrs:".length).join("").trimStart().split("");
                for (let i = 0; i < toExtract.length; i++)
                {
                    if (i > 0 && curlyCount === 0)
                    {
                        endValue = i;
                        break;
                    }
                    
                    const char = toExtract[i];
                    if (char === "{")
                        curlyCount++;
                    else if (char === "}")
                        curlyCount--;
                }
                
                const extracted = toExtract.join("").substring(0, endValue);
                const variable = `${key.replaceAll("-", "_").replaceAll("\"", "")}_attrs_${instanceCount}`;
                extracts.push({
                    element: key,
                    variable,
                    value: extracted
                });
                
                renderFn = before.join("").replace(syntax, modifiedSyntax) + `attrs: ${variable}` + toExtract.skip(endValue).join("");
            }
        });
        
    
        
    renderFn = renderFn
        .replace("var render = function ()", `var render = function (this: ${className})`)
        .replace("var _vm = this", `var _vm: ${className} = this; var _vm$ = this as any; ${extracts.map(t => `var ${t.variable}: ${globalComponentElementTypeCache!.get(t.element)!.schema} = ${t.value}`).join(";")};`)
        .replaceAll("_vm._", "_vm$._")
        .replaceAll("_vm.$", "_vm$.$")
        .replaceAll(", arguments)", ", arguments as any)");
        
    staticRenderFns = staticRenderFns
        .replaceAll(", arguments)", ", arguments as any)")
        .replace("render._withStripped", ";(<any>render)._withStripped");
    
    const combinedContents = `
    ${declaration}
    
    ${renderFn}
    
    ${staticRenderFns}
    `;
    
    const combinedFile = file.replace("-view.html", "-view-model.temp.ts");
    const combinedFilePath = Path.join(dir, combinedFile);
    if (!MemFs.existsSync(dir))
        MemFs.mkdirSync(dir, { recursive: true });
    MemFs.writeFileSync(combinedFilePath, combinedContents, { encoding: "utf-8" });
    if (isDebug)
    {
        if (debugFiles.contains(combinedFilePath.replace(".temp.ts", "")))
            Fs.writeFileSync(combinedFilePath, combinedContents, "utf8");
    }
    
    compile(isDebug, debugFiles, [combinedFilePath], combinedCompileConfig, this, true);
    
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
};

function compile(isDebug: boolean, debugFiles: ReadonlyArray<string>, fileNames: ReadonlyArray<string>,
    options: ts.CompilerOptions, loaderContext: LoaderContext<any>, isView = false): void
{
    const host = ts.createCompilerHost(options);
    host.writeFile = (fileName: string, contents: string): void =>
    {
        const dir = Path.dirname(fileName);
        if (!MemFs.existsSync(dir))
            MemFs.mkdirSync(dir, { recursive: true });

        MemFs.writeFileSync(fileName, contents, { encoding: "utf-8" });
        if (isDebug)
        {
            if (!isView)
            {
                if (debugFiles.contains(fileName.replace(".d.ts", "")))
                    Fs.writeFileSync(fileName, contents, "utf8");
            }
        }
    };

    const originalReadFile = host.readFile.bind(host);
    host.readFile = (filename: string): string | undefined => 
    {
        // const file = Path.basename(filename);
        // if (file.endsWith("-view-model.temp.ts"))
        //     return MemFs.readFileSync(filename, { encoding: "utf-8" }) as string;

        // if (file.endsWith(".d.ts"))
        // {
        //     if (MemFs.existsSync(filename))
        //         return MemFs.readFileSync(filename, { encoding: "utf-8" }) as string;
        // }

        if (MemFs.existsSync(filename))
            return MemFs.readFileSync(filename, { encoding: "utf-8" }) as string;

        return originalReadFile(filename);
    };

    const program = ts.createProgram(fileNames, options, host);
    const emitResult = program.emit();

    if (!isView)
        return;

    const allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);

    allDiagnostics.forEach(diagnostic =>
    {
        if (diagnostic.file && fileNames.contains(diagnostic.file.fileName))
        {
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (isView)
            {
                const viewFile = Path.basename(diagnostic.file.fileName).replace("-view-model.temp.ts", "-view.html");
                const viewFilePath = Path.join(Path.dirname(diagnostic.file.fileName), viewFile);
                loaderContext.emitError(new Error(`${viewFilePath} : ${message}`));
            }
            else
            {
                const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);

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

module.exports.pitch = function (this: LoaderContext<any>): void
{
    // console.log("Ts-check pitching", this.resourcePath);
    
    // if (this.mode !== "production")
    //     return;
    
    if (globalComponentElementTypeCache == null)
    {
        globalComponentElementTypeCache = new Map<string, { schema: string; filePath: string;  }>();

        const isPackage = __dirname.contains("node_modules");
        const paths = [Path.resolve(process.cwd(), "src")];
        if (isPackage)
            paths.push(Path.resolve(process.cwd(), "node_modules", "@nivinjoseph", "n-app", "src", "components"));
        else
            paths.push(Path.resolve(process.cwd(), "test-app"));

        const files = paths.reduce<Array<string>>((acc, path) =>
        {
            acc.push(...traverseAccumulateFiles(path));
            return acc;
        }, new Array<string>());

        files.forEach((filePath) => createBindingSchema(this, filePath));    
    }

    createBindingSchema(this, this.resourcePath);
};

function traverseAccumulateFiles(dir: string): Array<string>
{
    given(dir, "dir").ensureHasValue().ensureIsString()
        .ensure(t => Fs.statSync(t).isDirectory(), "not directory");

    return Fs.readdirSync(dir).reduce((acc, path) =>
    {
        path = Path.resolve(dir, path);
        if (Fs.statSync(path).isDirectory())
            acc.push(...traverseAccumulateFiles(path));
        else if (path.endsWith("-view.html"))
            acc.push(path);

        return acc;
    }, new Array<string>());
}

function createBindingSchema(context: LoaderContext<any>, filePath: string): void
{
    const file = Path.basename(filePath);
    const dir = Path.dirname(filePath);

    const viewModelFile = file.replace("-view.html", "-view-model.ts");
    const viewModelFilePath = Path.join(dir, viewModelFile);
    if (!Fs.existsSync(viewModelFilePath))
        return;

    const viewModelContents = Fs.readFileSync(viewModelFilePath, "utf8");

    const elementDecorator = "@element(";
    const bindDecorator = "@bind(";
    const isComponent = viewModelContents.contains(elementDecorator); // && viewModelContents.contains(bindDecorator);
    if (!isComponent)
        return;
        
    context.addDependency(viewModelFilePath);

    let start = viewModelContents.indexOf(elementDecorator);
    let end = viewModelContents.indexOf(")", start);
    const element = viewModelContents.substring(start, end).replace(elementDecorator, "");
    // console.log(element);

    let schema = "any";
    if (viewModelContents.contains(bindDecorator))
    {
        start = viewModelContents.indexOf(bindDecorator);
        end = viewModelContents.indexOf(")", start);
        schema = viewModelContents.substring(start, end).replace(bindDecorator, "");
        // console.log(schema);
        schema = schemaToJson(schema);
        schema = schemaToType(JSON.parse(schema));
        // console.log(schema);
    }
    
    globalComponentElementTypeCache!.set(element, { schema, filePath: viewModelFilePath });
}

function schemaToJson(schema: string): string
{
    given(schema, "schema").ensureHasValue().ensureIsString();

    const splitSchema = schema.replaceAll("\r", "").replaceAll("\n", "").replaceAll("\r\n", "").replaceAll(" ", "")
        .replaceAll("'", "\"").split("");

    const formattedSchema = new Array<string>();

    // '{"foo?": "string", "bar": [], "baz": Nove, box: {b: "string"}'

    for (let i = 0; i < splitSchema.length; i++)
    {
        const char = splitSchema[i];
        if (i === 0)
        {
            formattedSchema.push(char);
            continue;
        }

        const charRe = /[A-Za-z0-9_$?]/;

        if (charRe.test(char))
        {
            const lastChar = splitSchema[i - 1];
            if (charRe.test(lastChar) || lastChar === "\"")
            {
                formattedSchema.push(char);
                continue;
            }
            else
            {
                formattedSchema.push("\"");
                formattedSchema.push(char);
                continue;
            }
        }
        else
        {
            if (char === "\"")
            {
                formattedSchema.push(char);
                continue;
            }

            const lastChar = splitSchema[i - 1];
            if (charRe.test(lastChar))
            {
                formattedSchema.push("\"");
                formattedSchema.push(char);
                continue;
            }
            else
            {
                formattedSchema.push(char);
                continue;
            }
        }
    }

    return formattedSchema.join("");

    // const schemaObj = JSON.parse(formattedSchema.join("")) as object;
}


function schemaToType(schema: Record<string, any>, isTopLevel = true): string
{
    const typeDetails = Object.keys(schema)
        .map(key =>
        {
            const left = `"${isTopLevel ? key.split("").map(t => /[A-Z]/.test(t) ? `-${t.toLowerCase()}` : t).join("") : key}"`;
            const right = parseType(schema[key]);
            const isOptional = left.contains("?");
            
            return { left, right, isOptional };
        });
    
    if (isTopLevel)
    {
        const optionals = typeDetails.where(t => t.isOptional);
        let typedOptionals: string | null = null;
        if (optionals.isNotEmpty)
        {
            const flatOptionals = optionals
                .map(t =>
                {
                    t.left = t.left.replace("?", "");
                    return t.left + ": " + t.right;
                })
                .join(";");
            
            typedOptionals = `Partial<{ ${flatOptionals} }>`;
        }
        const requireds = typeDetails.where(t => !t.isOptional);
        let typedRequireds: string | null = null;
        if (requireds.isNotEmpty)
        {
            const flatRequireds = requireds
                .map(t => t.left + ": " + t.right)
                .join(";");
            
            typedRequireds = `{ ${flatRequireds} }`;
        }
        
        let result = "";
        if (typedOptionals)
            result += typedOptionals;
        if (typedRequireds)
        {
            if (result.isNotEmptyOrWhiteSpace())
                result += "&";
            result += typedRequireds;
        }
        return result;
    }
        
    return `{ ${typeDetails.map(t => t.left + ": " + t.right).join(";")} }`;
}

function parseType(right: any): string
{
    if (typeof right === "string")
    {
        right = right.trim().toLowerCase();
        switch (right)
        {
            case "string":
                break;
            case "boolean":
                break;
            case "number":
                break;
            case "function":
                right = "Function";
                break;
            case "array":
                right = "ReadonlyArray<any>";
                break;
            case "object":
                break;
            default:
                right = "object";
                break;
        }
    }
    else if (Array.isArray(right))
    {
        if (right.isEmpty)
            right = "ReadonlyArray<any>";
        else
        {
            const arrayType = right[0];
            right = `ReadonlyArray<${parseType(arrayType)}>`;
        }
    }
    else // {} object literal
    {
        right = schemaToType(right, false);
    }
    
    return right as string;
}

// interface Foo
// {
//     num: number;
//     str: string;
//     bool: boolean;
//     func: Function;
//     array: Array<any>;
//     object: object;
// }

// type Foo = { a: string; b: number; };
// type Bar = { c: string; d: number; };
// type ParFoo = Partial<Foo>;

// const s: Partial<Foo> & Bar = {
//     a: "",
//     "s": 4,
    
// };

// const ["s"] = <{ "max-file-size": number; "multiple": boolean; } & { "id": string; "mime-types": string; }>{
//     id: "",
//     "mime-types": "",
//     "max-file-size": 5,
//     multiple: true,
//     foo: 4
// };