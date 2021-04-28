"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raw = void 0;
require("@nivinjoseph/n-ext");
const Sharp = require("sharp");
const loaderUtils = require("loader-utils");
const Path = require("path");
const n_util_1 = require("@nivinjoseph/n-util");
const n_config_1 = require("@nivinjoseph/n-config");
const imagemin = require("imagemin");
function resize(filePath, width, height) {
    const promise = new Promise((resolve, reject) => {
        Sharp(filePath)
            // .resize(width, height, {fit: "inside"})
            .resize(width, height)
            .toBuffer((err, buf, info) => {
            err ? reject(err) : resolve({
                // name: fileName.endsWith(info.format) ? fileName : fileName + "." + info.format,
                ext: info.format.toLowerCase(),
                width: info.width,
                height: info.height,
                size: info.size,
                data: buf
            });
        });
    });
    // We could optionally optimize the image here using
    // https://github.com/imagemin/imagemin
    return promise;
}
// @ts-ignore
// tslint:disable-next-line: no-default-export
function default_1(content) {
    const MIMES = {
        "jpg": "image/jpeg",
        "jpeg": "image/jpeg",
        "png": "image/png",
        "gif": "image/gif"
    };
    const ext = Path.extname(this.resourcePath).replace(/\./, "").toLowerCase();
    if (!MIMES[ext])
        throw new Error(`Unsupported format for file '${this.resourcePath}'`);
    const parsedResourceQuery = this.resourceQuery ? loaderUtils.parseQuery(this.resourceQuery) : {};
    Object.keys(parsedResourceQuery)
        .filter(t => ["width", "height"].contains(t))
        .forEach(t => parsedResourceQuery[t] = n_util_1.TypeHelper.parseNumber(parsedResourceQuery[t]));
    const { width, height } = parsedResourceQuery;
    const options = loaderUtils.getOptions(this) || {};
    const context = options.context || this.rootContext;
    const isDev = n_config_1.ConfigurationManager.getConfig("env") === "dev";
    // const limit = options.limit;
    const callback = this.async();
    const plugins = [
        require("imagemin-gifsicle")({}),
        require("imagemin-mozjpeg")({}),
        // require("imagemin-svgo")({}),
        // require("imagemin-pngquant")({}),
        require("imagemin-optipng")({}),
        // require("imagemin-webp")({})
    ];
    if (width || height) {
        resize(this.resourcePath, width, height)
            .then(resized => {
            // console.log("resized size", resized.size);
            imagemin.buffer(resized.data, { plugins })
                .then((data) => {
                // const size = data.byteLength;
                // console.log("minified size", size);
                const url = loaderUtils.interpolateName(this, `[contenthash]${isDev ? "" : n_util_1.Uuid.create()}.${resized.ext}`, {
                    context,
                    content: data
                });
                const outputPath = url;
                const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;
                this.emitFile(outputPath, data);
                callback(null, `module.exports = ${publicPath}`);
            })
                .catch((e) => callback(e));
        })
            .catch(e => callback(e));
    }
    else {
        const original = typeof content === "string" ? Buffer.from(content) : content;
        // console.log("original size", original.byteLength);
        imagemin.buffer(original, { plugins })
            .then((data) => {
            // const size = data.byteLength;
            // console.log("minified size", size);
            const url = loaderUtils.interpolateName(this, `[contenthash].${ext}`, {
                context,
                content: data
            });
            const outputPath = url;
            const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;
            this.emitFile(outputPath, data);
            callback(null, `module.exports = ${publicPath}`);
            // if (limit && size > limit)
            // {
            //     const url = loaderUtils.interpolateName(this, `[contenthash].${ext}`, {
            //         context,
            //         content: data
            //     });
            //     const outputPath = url;
            //     const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;
            //     this.emitFile(outputPath, data);
            //     callback(null, `module.exports = ${publicPath}`);
            // }
            // else
            // {
            //     const base64 = JSON.stringify("data:" + MIMES[ext] + ";" + "base64," + data.toString("base64"));
            //     callback(null, `module.exports = ${base64}`);
            // }
        })
            .catch((e) => callback(e));
    }
}
exports.default = default_1;
exports.raw = true;
//# sourceMappingURL=xx-raster-image-loader.js.map