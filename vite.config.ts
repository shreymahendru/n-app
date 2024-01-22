// import { fileURLToPath, URL } from "node:url";

// import { defineConfig, type Plugin } from "vite";
// import vue from "@vitejs/plugin-vue";
// import { ConfigurationManager } from "@nivinjoseph/n-config";
// import topLevelAwait from "vite-plugin-top-level-await";
// import babel from "@babel/core";
// import inject from "@rollup/plugin-inject";
// import requireTransform from "vite-plugin-require-transform";


// // A very simple Vite plugin support babel transpilation
// const babelPlugin: Plugin = {
//     name: "plugin-babel",
//     // @ts-expect-error chill
//     transform(code, id, _) 
//     {
//         // console.log("id", id);

//         if (! /\.(ts)$/.test(id))
//             return null;

//         if (id.split("/").some(t => t === "node_modules"))
//             return null;

//         return babel.transform(code, {
//             filename: id,
//             babelrc: false,
//             presets: [
//                 ["@babel/preset-env", { "modules": false }]
//             ],
//             plugins: [
//                 "@babel/plugin-transform-runtime",
//                 ["@babel/plugin-proposal-decorators", { "version": "2023-05" }],
//                 "@babel/plugin-transform-class-properties"
//             ]
//         });
//     }
// };

// // const indexHtmlPlugin: Plugin = {
// //     name: "plugin-index-html",
// //     transformIndexHtml: {
// //         handler: (html, ctx) =>
// //         {
// //             // console.log(html);
// //             // console.log(ctx);
// //         }
// //     }
// // };


// const env = ConfigurationManager.getConfig<string>("env");
// console.log("VITE ENV", env);

// // const isDev = env === "dev";

// // https://vitejs.dev/config/
// export default defineConfig({
//     appType: "spa",
//     root: "./test-app-new/",
//     build: {
//         minify: false,
//         cssMinify: false
//         // target: 
//     },
//     optimizeDeps: {
//         include: ["jquery"],
//         esbuildOptions: {
//             tsconfig: "./tsconfig.app.json"
//         }
//     },
//     // esbuild: {

//     // }
//     assetsInclude: ["test-app-new/client/**/*.html"],
//     plugins: [
//         inject({
//             $: "jquery"
//         }),

//         vue({
//             style: {
//                 trim: false
//             },
//             // template: {
//             //     // preprocessOptions: {}
//             //     compilerOptions: {


//             //     }
//             // }
//             script: {
//                 babelParserPlugins: [
//                     "decorators",
//                     "typescript",
//                     "topLevelAwait"
//                 ]
//             }
//         }),
//         babelPlugin,
//         // babel({
//         //     filter: /\.ts?$/,

//         //     babelConfig: {
//         //         babelrc: false,
//         //         configFile: false,
//         //         plugins: [
//         //             ["@babel/plugin-proposal-decorators", { "version": "2023-05" }]
//         //         ]
//         //     }
//         // }),
//         topLevelAwait({
//             // The export name of top-level await promise for each chunk module
//             promiseExportName: "__tla",
//             // The function to generate import names of top-level await promise in each chunk module
//             promiseImportName: (i) => `__tla_${i}`
//         }),
//         requireTransform({})
//         // indexHtmlPlugin
//     ],
//     define: {
//         APP_CONFIG: {}
//     },
//     resolve: {
//         alias: {
//             "@": fileURLToPath(new URL("./src", import.meta.url)),
//             "vue": "vue/dist/vue.esm-bundler.js"
//         }
//     }
// });

import { fileURLToPath, URL } from "node:url";

import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import { ConfigurationManager } from "@nivinjoseph/n-config";
import topLevelAwait from "vite-plugin-top-level-await";
import babel from "@babel/core";
import inject from "@rollup/plugin-inject";
import requireTransform from "vite-plugin-require-transform";


// A very simple Vite plugin support babel transpilation
const babelPlugin: Plugin = {
    name: "plugin-babel",
    // @ts-expect-error chill
    transform(code, id, _) 
    {
        // console.log("id", id);

        if (! /\.(ts)$/.test(id))
            return null;

        if (id.split("/").some(t => t === "node_modules"))
            return null;

        return babel.transform(code, {
            filename: id,
            babelrc: false,
            presets: [
                ["@babel/preset-env", { "modules": false }]
            ],
            plugins: [
                "@babel/plugin-transform-runtime",
                ["@babel/plugin-proposal-decorators", { "version": "2023-05" }],
                "@babel/plugin-transform-class-properties"
            ]
        });
    }
};

// const indexHtmlPlugin: Plugin = {
//     name: "plugin-index-html",
//     transformIndexHtml: {
//         handler: (html, ctx) =>
//         {
//             // console.log(html);
//             // console.log(ctx);
//         }
//     }
// };


const env = ConfigurationManager.getConfig<string>("env");
console.log("VITE ENV", env);

// const isDev = env === "dev";

// https://vitejs.dev/config/
export default defineConfig({
    appType: "spa",
    root: "./test-app/client/",
    build: {
        minify: false,
        cssMinify: false
        // target: 
    },
    optimizeDeps: {
        include: ["jquery"],
        esbuildOptions: {
            tsconfig: "./tsconfig.app.json"
        }
    },
    // esbuild: {

    // }

    assetsInclude: ["test-app/client/**/*-view.html"],
    plugins: [
        vue({
            style: {
                trim: false
            },
            // template: {
            //     // preprocessOptions: {}
            //     compilerOptions: {


            //     }
            // }
            script: {
                babelParserPlugins: [
                    "decorators",
                    "typescript",
                    "topLevelAwait"
                ]
            }
        }),
        babelPlugin,
        // babel({
        //     filter: /\.ts?$/,

        //     babelConfig: {
        //         babelrc: false,
        //         configFile: false,
        //         plugins: [
        //             ["@babel/plugin-proposal-decorators", { "version": "2023-05" }]
        //         ]
        //     }
        // }),
        topLevelAwait({
            // The export name of top-level await promise for each chunk module
            promiseExportName: "__tla",
            // The function to generate import names of top-level await promise in each chunk module
            promiseImportName: (i) => `__tla_${i}`
        }),
        requireTransform({}),
        inject({
            $: "jquery"
        })
        // indexHtmlPlugin
    ],
    define: {
        APP_CONFIG: {}
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "vue": "vue/dist/vue.esm-bundler.js"
        }
    }
});
