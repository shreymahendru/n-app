"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            .resize(width, height)
            .toBuffer((err, buf, info) => {
            err ? reject(err) : resolve({
                ext: info.format.toLowerCase(),
                width: info.width,
                height: info.height,
                size: info.size,
                data: buf
            });
        });
    });
    return promise;
}
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
    const callback = this.async();
    const plugins = [
        require("imagemin-gifsicle")({}),
        require("imagemin-mozjpeg")({}),
        require("imagemin-optipng")({}),
    ];
    if (width || height) {
        resize(this.resourcePath, width, height)
            .then(resized => {
            imagemin.buffer(resized.data, { plugins })
                .then((data) => {
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
        imagemin.buffer(original, { plugins })
            .then((data) => {
            const url = loaderUtils.interpolateName(this, `[contenthash].${ext}`, {
                context,
                content: data
            });
            const outputPath = url;
            const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;
            this.emitFile(outputPath, data);
            callback(null, `module.exports = ${publicPath}`);
        })
            .catch((e) => callback(e));
    }
}
exports.default = default_1;
exports.raw = true;
//# sourceMappingURL=xx-raster-image-loader.js.map