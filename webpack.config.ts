const path = require("path");
const autoprefixer = require("autoprefixer");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
import { ConfigurationManager } from "@nivinjoseph/n-config";
const webpack = require("webpack");


const env = ConfigurationManager.getConfig<string>("env");
console.log("WEBPACK ENV", env);

const isDev = env === "dev";

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
                loader: "css-loader" // translates CSS into CommonJS
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
                loader: "css-loader" // translates CSS into CommonJS
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
                    // @ts-ignore
                    name: (resourcePath: string, resourceQuery: string) =>
                    {
                        // `resourcePath` - `/absolute/path/to/file.js`
                        // `resourceQuery` - `?foo=bar`

                        if (process.env.NODE_ENV === "development")
                        {
                            return "[path][name]-[contenthash].[ext]";
                        }

                        return "[contenthash]-[name].[ext]";

                        // return "[path][name].[ext]";
                    }
                }
            },
            // {
            //     loader: "file-loader",
            //     options: {
            //         esModule: false,
            //         name: "[path][name]-[contenthash].[ext]",
            //     }
            // },
            {
                loader: path.resolve("src/loaders/raster-image-loader.js"),
                options: {
                    // urlEncodeLimit: isDev ? 9000000000 : 900000,
                    jpegQuality: 80,
                    pngQuality: 50
                }
            }
            // {
            //     loader: "webp-loader"
            // }
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
        test: /\.taskworker\.js$/,
        loader: "worker-loader"
    },
    {
        test: /-view-model\.js$/,
        use: [
            {
                loader: path.resolve("src/loaders/view-model-loader.js"),
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
        test: /-view\.html$/,
        exclude: [path.resolve(__dirname, "test-app/controllers")],
        use: [
            ...(isDev ? [] :
                [{
                    loader: "vue-loader/lib/loaders/templateLoader.js"
                },
                {
                    loader: path.resolve("src/loaders/view-loader.js")
                }]),
            {
                loader: "html-loader",
                options: {
                    attrs: ["img:src", "use:xlink:href"]
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
                    attrs: ["img:src", "use:xlink:href"]
                }
            }
        ]
    }
];

const plugins = [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
        template: "test-app/controllers/index-view.html",
        filename: "index-view.html",
        favicon: "test-app/client/images/favicon.png",
        hash: true,
    }),
    new MiniCssExtractPlugin({}),
    new webpack.DefinePlugin({
        APP_CONFIG: JSON.stringify({})
    })
];

if (isDev)
{
    moduleRules.push({
        test: /\.js$/,
        loader: "source-map-loader",
        enforce: "pre"
    });
    
    plugins.push(new webpack.WatchIgnorePlugin([
        /\.js$/,
        /\.d\.ts$/
    ]));
}
else
{
    moduleRules.push({
        test: /\.js$/,
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
        main: ["./test-app/client/app.js"]
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
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: moduleRules
    },
    plugins: plugins,
    resolve: {
        alias: {
            // https://feathericons.com/
            feather: path.resolve(__dirname, "node_modules/feather-icons/dist/feather-sprite.svg"),
            vue: isDev ? "@nivinjoseph/vue/dist/vue.js" : "@nivinjoseph/vue/dist/vue.runtime.common.prod.js"
        }
    }
};