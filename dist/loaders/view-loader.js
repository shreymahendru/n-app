"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vm = require("vm");
const path = require("path");
const getOptions = require("loader-utils").getOptions;
const btoa = require("btoa");
const config = require(path.resolve(process.cwd(), "webpack.config.js"));
const resolve = require("enhanced-resolve").create.sync({ alias: config.resolve && config.resolve.alias || [] });
function extractLoader(src) {
    return __awaiter(this, void 0, void 0, function* () {
        const done = this.async();
        const options = getOptions(this) || {};
        const publicPath = getPublicPath(options, this);
        this.cacheable();
        try {
            done(null, yield evalDependencyGraph({
                loaderContext: this,
                src,
                filename: this.resourcePath,
                publicPath,
            }));
        }
        catch (error) {
            done(error);
        }
    });
}
exports.default = extractLoader;
function evalDependencyGraph({ loaderContext, src, filename, publicPath = "" }) {
    const moduleCache = new Map();
    function loadModule(filename) {
        return new Promise((resolve, reject) => {
            loaderContext.loadModule(filename, (error, src) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(src);
                }
            });
        });
    }
    function extractExports(exports) {
        const hasBtoa = "btoa" in global;
        const previousBtoa = global.btoa;
        global.btoa = btoa;
        try {
            return exports.toString();
        }
        catch (error) {
            throw error;
        }
        finally {
            if (hasBtoa) {
                global.btoa = previousBtoa;
            }
            else {
                delete global.btoa;
            }
        }
    }
    function extractQueryFromPath(givenRelativePath) {
        const indexOfLastExclMark = givenRelativePath.lastIndexOf("!");
        const indexOfQuery = givenRelativePath.lastIndexOf("?");
        if (indexOfQuery !== -1 && indexOfQuery > indexOfLastExclMark) {
            return {
                relativePathWithoutQuery: givenRelativePath.slice(0, indexOfQuery),
                query: givenRelativePath.slice(indexOfQuery),
            };
        }
        return {
            relativePathWithoutQuery: givenRelativePath,
            query: "",
        };
    }
    function evalModule(src, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const rndPlaceholder = "__EXTRACT_LOADER_PLACEHOLDER__" + rndNumber() + rndNumber();
            const rndPlaceholderPattern = new RegExp(rndPlaceholder, "g");
            const script = new vm.Script(src, {
                filename,
                displayErrors: true,
            });
            const newDependencies = [];
            const exports = {};
            const sandbox = Object.assign({}, global, {
                module: {
                    exports,
                },
                exports,
                __webpack_public_path__: publicPath,
                require: (givenRelativePath) => {
                    const { relativePathWithoutQuery, query } = extractQueryFromPath(givenRelativePath);
                    const indexOfLastExclMark = relativePathWithoutQuery.lastIndexOf("!");
                    const loaders = givenRelativePath.slice(0, indexOfLastExclMark + 1);
                    const relativePath = relativePathWithoutQuery.slice(indexOfLastExclMark + 1);
                    const absolutePath = resolve(path.dirname(filename), relativePath);
                    const ext = path.extname(absolutePath);
                    if (moduleCache.has(absolutePath)) {
                        return moduleCache.get(absolutePath);
                    }
                    if (loaders === "" && ext === ".js") {
                        loaderContext.addDependency(absolutePath);
                        const exports = require(absolutePath);
                        moduleCache.set(absolutePath, exports);
                        return exports;
                    }
                    newDependencies.push({
                        absolutePath,
                        absoluteRequest: loaders + absolutePath + query,
                    });
                    return rndPlaceholder;
                },
            });
            script.runInNewContext(sandbox);
            const extractedDependencyContent = yield Promise.all(newDependencies.map(({ absolutePath, absoluteRequest }) => __awaiter(this, void 0, void 0, function* () {
                const src = yield loadModule(absoluteRequest);
                return evalModule(src, absolutePath);
            })));
            const contentWithPlaceholders = extractExports(sandbox.module.exports);
            const extractedContent = contentWithPlaceholders.replace(rndPlaceholderPattern, () => extractedDependencyContent.shift());
            moduleCache.set(filename, extractedContent);
            return extractedContent;
        });
    }
    return evalModule(src, filename);
}
function rndNumber() {
    return Math.random()
        .toString()
        .slice(2);
}
function getPublicPath(options, context) {
    if ("publicPath" in options) {
        return typeof options.publicPath === "function" ? options.publicPath(context) : options.publicPath;
    }
    if (context.options && context.options.output && "publicPath" in context.options.output) {
        return context.options.output.publicPath;
    }
    if (context._compilation && context._compilation.outputOptions && "publicPath" in context._compilation.outputOptions) {
        return context._compilation.outputOptions.publicPath;
    }
    return "";
}
//# sourceMappingURL=view-loader.js.map