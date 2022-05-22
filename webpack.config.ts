/* eslint-disable @typescript-eslint/no-unsafe-call */
import "@nivinjoseph/n-ext";
const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
import { ConfigurationManager } from "@nivinjoseph/n-config";
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");


const env = ConfigurationManager.getConfig<string>("env");
console.log("WEBPACK ENV", env);

const isDev = env === "dev";

const tsLoader = {
    loader: "ts-loader",
    options: {
        configFile: "tsconfig.client.json",
        transpileOnly: true
    }
};

// const tsLintLoader = {
//     loader: "tslint-loader",
//     options: {
//         configFile: "tslint.json",
//         tsConfigFile: "tsconfig.client.json",
//         // typeCheck: true, // this is a performance hog
//         typeCheck: !isDev,
//         emitErrors: true
//     }
// };

const moduleRules: Array<any> = [
    {
        test: /\.(scss|sass)$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    esModule: false
                }
            },
            {
                loader: "css-loader", // translates CSS into CommonJS
                options: {
                    esModule: false
                }
            },
            {
                loader: "postcss-loader", // postcss
                options: {
                    postcssOptions: {
                        plugins: [
                            "postcss-flexbugs-fixes",
                            autoprefixer({
                                // browsers: [
                                //     ">1%",
                                //     "not ie < 9"
                                // ],
                                flexbox: "no-2009"
                            })
                        ]
                    }
                }
            },
            {
                loader: "sass-loader" // compiles Sass to CSS -> depends on node-sass
            }
        ]
    },
    {
        test: /\.css$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    esModule: false
                }
            },
            {
                loader: "css-loader", // translates CSS into CommonJS
                options: {
                    esModule: false
                }
            }
        ]
    },
    {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: 9000,
                    fallback: "file-loader",
                    esModule: false,
                    name: (_resourcePath: string, _resourceQuery: string): string =>
                    {
                        // `resourcePath` - `/absolute/path/to/file.js`
                        // `resourceQuery` - `?foo=bar`

                        if (process.env.NODE_ENV === "development")
                        {
                            return "[path][name].[ext]";
                        }

                        return "[contenthash]-[name].[ext]";

                        // return "[path][name].[ext]";
                    }
                }
            },
            {
                loader: path.resolve("src/loaders/raster-image-loader.js"),
                options: {
                    // urlEncodeLimit: isDev ? 9000000000 : 900000,
                    jpegQuality: 80,
                    pngQuality: 60
                }
            }
        ]
    },
    {
        test: /\.svg$/,
        use: [
            {
                loader: "file-loader",
                options: {
                    esModule: false
                }
            }
        ]
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
            isDev ? "file-loader" : {
                loader: "url-loader",
                options: {
                    limit: 9000,
                    fallback: "file-loader"
                }
            }
        ]
    },
    {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [tsLoader]
    },
    // {
    //     test: /\.ts$/,
    //     exclude: /node_modules/,
    //     enforce: "pre",
    //     use: [tsLintLoader]
    // },
    {
        test: /-resolver\.ts$/,
        use: [
            { loader: path.resolve("src/loaders/resolver-loader.js") },
            tsLoader
        ]
    },
    {
        test: /-view-model\.ts$/,
        use: [
            { loader: path.resolve("src/loaders/view-model-loader.js") },
            tsLoader
        ]
    },
    {
        test: /-view-model\.js$/,
        use: [
            {
                loader: path.resolve("src/loaders/view-model-loader.js"),
                // The options below can be applied to any use of the view-model-loader
                options: {
                    defaultPageTitle: "fooo",
                    defaultPageMetadata: [
                        { name: "description", content: "this is the default description" }
                    ]
                }
            }
        ]
    },
    {
        test: /\.taskworker\.ts$/,
        use: [
            {
                loader: "worker-loader",
                options: {
                    esModule: false,
                    filename: "[name].[contenthash].worker.js",
                    chunkFilename: "[id].[contenthash].worker.js"
                }
            },
            tsLoader
        ]
    },
    {
        test: /-view\.html$/,
        exclude: [path.resolve(__dirname, "test-app/controllers")],
        use: [
            ...isDev ? [] :
                [{
                    loader: "vue-loader/lib/loaders/templateLoader.js"
                },
                {
                    loader: path.resolve("src/loaders/view-loader.js")
                }],
            {
                loader: "html-loader",
                options: {
                    esModule: false
                }
            }
        ]
    },
    {
        test: /-view\.html$/,
        include: [path.resolve(__dirname, "test-app/controllers")],
        use: [
            {
                loader: "html-loader",
                options: {
                    esModule: false
                }
            }
        ]
    }
];

const plugins = [
    new ForkTsCheckerWebpackPlugin({
        async: isDev,
        typescript: {
            configFile: "tsconfig.client.json",
            configOverwrite: {
                compilerOptions: { skipLibCheck: true, sourceMap: true, inlineSourceMap: false, declarationMap: false }
            }
        }
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: "test-app/controllers/index-view.html",
        filename: "index-view.html",
        favicon: "test-app/client/images/favicon.png",
        hash: true,
        minify: false
    }),
    new HtmlWebpackTagsPlugin({
        append: false,
        usePublicPath: false,
        tags: []
    }),
    new MiniCssExtractPlugin({}),
    new webpack.DefinePlugin({
        APP_CONFIG: JSON.stringify({})
    }),
    new webpack.ProvidePlugin({
        // "__assign": ["tslib", "__assign"],
        // "__extends": ["tslib", "__extends"],
        // "__awaiter": ["tslib", "__awaiter"]

        ...Object.keys(require("tslib"))
            .reduce<Record<string, Array<string>>>((acc, key) =>
            {
                acc[key] = ["tslib", key];
                return acc;
            }, {})
    })
];



if (isDev)
{
    // moduleRules.push({
    //     test: /\.js$/,
    //     loader: "source-map-loader",
    //     enforce: "pre"
    // });

    plugins.push(new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/]
    }));

    plugins.push(new webpack.HotModuleReplacementPlugin());
}
else
{
    moduleRules.push({
        test: /\.js$/,
        include: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "test-app/client")
        ],
        use: {
            loader: "babel-loader",
            options: {
                presets: [["@babel/preset-env", {
                    debug: false,
                    targets: {
                        // browsers: ["> 1%", "Chrome >= 41"],
                        chrome: "41" // this is what googles web crawler uses
                    },
                    useBuiltIns: "entry",
                    forceAllTransforms: true,
                    modules: "commonjs"
                }]]
                // presets: ["@babel/preset-env"]
            }
        }
    });

    plugins.push(...[
        new CompressionPlugin({
            test: /\.(js|css|svg)$/
        })
    ]);
}

module.exports = {
    context: process.cwd(),
    mode: isDev ? "development" : "production",
    target: "web",
    entry: {
        main: ["./test-app/client/app.js", isDev ? "webpack-hot-middleware/client" : null].where(t => t != null)
    },
    output: {
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js",
        path: path.resolve(__dirname, "test-app/client/dist"),
        publicPath: "/"
    },
    devtool: isDev ? "source-map" : false,
    optimization: {
        // splitChunks: {
        //     cacheGroups: {
        //         vendor: {
        //             test: /node_modules/,
        //             chunks: "initial",
        //             name: "vendor",
        //             enforce: true
        //         },
        //     }
        // },
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all"
        },
        minimizer: [
            // new UglifyJsPlugin({
            //     sourceMap: false,
            //     uglifyOptions: {
            //         keep_classnames: true,
            //         keep_fnames: true,
            //         safari10: true,
            //         output: {
            //             comments: false
            //         }
            //     }
            // }),
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true,
                    safari10: true,
                    mangle: true,
                    output: {
                        comments: false
                    }
                },
                extractComments: false
            }),
            new CssMinimizerPlugin()
        ]
    },
    module: {
        rules: moduleRules
    },
    plugins: plugins,
    resolve: {
        extensions: [".ts", ".js"],
        symlinks: false,
        alias: {
            // https://feathericons.com/
            feather: path.resolve(__dirname, "node_modules/feather-icons/dist/feather-sprite.svg"),
            vue: isDev ? "@nivinjoseph/vue/dist/vue.js" : "@nivinjoseph/vue/dist/vue.runtime.common.prod.js",
            "tslib$": "tslib/tslib.es6.js"
        }
    }
};