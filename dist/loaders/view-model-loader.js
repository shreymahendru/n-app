"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nivinjoseph/n-ext");
const n_config_1 = require("@nivinjoseph/n-config");
const hash = require("hash-sum");
const loaderUtils = require("loader-utils");
function default_1(content) {
    if (!content.contains("__decorate"))
        return content;
    const options = loaderUtils.getOptions(this);
    let defaultPageTitle, defaultPageMetadata;
    if (options)
        ({ defaultPageTitle, defaultPageMetadata } = options);
    const dirPath = this.context;
    const filePath = this.resourcePath;
    const fileName = filePath.replace(dirPath + "/", "");
    const className = fileName.replace(".js", "").split("-").map(t => `${t[0].toUpperCase()}${t.substring(1)}`).join("");
    const componentCode = `
        ${className}.___componentOptions = ${className}.createComponentOptions(${className}, ${JSON.stringify(defaultPageTitle)}, ${JSON.stringify(defaultPageMetadata)});
        // console.log(${className}.___componentOptions);
        
        exports.${className} = ${className};
    `;
    content = content.replace(`exports.${className} = ${className};`, componentCode);
    if (n_config_1.ConfigurationManager.getConfig("env") !== "dev")
        return content;
    const viewFileName = fileName.replace("-view-model.js", "-view.html");
    const relativeViewFilePath = "./" + viewFileName;
    const id = hash(className);
    const hotReloadAPIPath = JSON.stringify(require.resolve("vue-hot-reload-api"));
    const vueTemplateCompilerPath = JSON.stringify(require.resolve("vue-template-compiler"));
    const hotReloadCode = `
            if(module.hot)
            {
                const componentOptions = ${className}.___componentOptions;
                
                componentOptions.___viewModel = ${className};
                
                // console.log('is Hot');
                const api = require(${hotReloadAPIPath});
                api.install(require('@nivinjoseph/vue'));
                
                if (!api.compatible) 
                    throw new Error('vue-hot-reload-api is not compatible with the version of Vue you are using.');
                
                module.hot.accept();
                
                if (!api.isRecorded('${id}')) 
                {
                    api.createRecord('${id}', componentOptions);
                    // console.log("creating record", "${id}");
                }
                else 
                {
                    componentOptions.___reload = true;
                    if(componentOptions.___preReload)
                        componentOptions.___preReload(api, componentOptions);
                    api.reload('${id}', componentOptions);
                    // console.log("updating record", "${id}");
                }
                
                const vueTemplateCompiler = require(${vueTemplateCompilerPath});
                
                module.hot.accept('${relativeViewFilePath}', function () {
                    const renderFuncs = vueTemplateCompiler.compileToFunctions(require('${relativeViewFilePath}'));
                    if(componentOptions.___preRerender)
                        componentOptions.___preRerender(api, renderFuncs);
                    api.rerender('${id}', renderFuncs);
                    // console.log("re-rendering record", "${id}");
                });
            }
            
            // exports.${className} = ${className};
        `;
    return content + hotReloadCode;
}
exports.default = default_1;
//# sourceMappingURL=view-model-loader.js.map