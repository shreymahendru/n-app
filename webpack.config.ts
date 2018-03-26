const path = require("path");
const autoprefixer = require("autoprefixer");
const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
import { ConfigurationManager } from "@nivinjoseph/n-config";

const isDev = ConfigurationManager.getConfig<string>("env") === "dev";

const plugins = [
    new cleanWebpackPlugin(["test-app/client/dist"]),
    new htmlWebpackPlugin({
        template: "test-app/controllers/index-view.html",
        hash: true,
        favicon: "test-app/client/images/favicon.png",
    })
];

if (!isDev)
    plugins.push(new UglifyJSPlugin({
        // sourceMap: true,
        uglifyOptions: {
            // mangle: false,
            keep_classnames: true
            // keep_fnames: true,
            // warnings: true
        }
    }));

module.exports = {
    entry: ["./test-app/client/app.js"],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "test-app/client/dist"),
        publicPath: "/"
    },
    devtool: isDev ? "inline-source-map" : "source-map",
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "postcss-loader", // postcss
                options: {
                    plugins: () => [
                        require("postcss-flexbugs-fixes"),
                        autoprefixer({
                            browsers: [
                                ">1%",
                                "not ie < 9"
                            ],
                            flexbox: "no-2009"
                        })
                    ]
                }
            }, {
                loader: "sass-loader" // compiles Sass to CSS -> depends on node-sass
            }]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: ["file-loader"]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ["file-loader"]
        },
        {
            test: /\.(html)$/,
            use: ["html-loader"]
        }]
    },
    plugins
};