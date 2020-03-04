"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nivinjoseph/n-ext");
const Sharp = require("sharp");
const loaderUtils = require("loader-utils");
const Path = require("path");
const n_util_1 = require("@nivinjoseph/n-util");
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
    const limit = options.limit;
    if (width || height) {
        const callback = this.async();
        resize(this.resourcePath, width, height)
            .then(resized => {
            const size = resized.size;
            if (limit && size > limit) {
                const url = loaderUtils.interpolateName(this, `[contenthash].${resized.ext}`, {
                    context,
                    content: resized.data
                });
                const outputPath = url;
                const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;
                this.emitFile(outputPath, resized.data);
                callback(null, `module.exports = ${publicPath}`);
            }
            else {
                const base64 = JSON.stringify("data:" + MIMES[resized.ext] + ";" + "base64," + resized.data.toString("base64"));
                callback(null, `module.exports = ${base64}`);
            }
        })
            .catch(e => callback(e));
    }
    else {
        const data = typeof content === "string" ? Buffer.from(content) : content;
        const size = data.byteLength;
        if (limit && size > limit) {
            const url = loaderUtils.interpolateName(this, `[contenthash].${ext}`, {
                context,
                content: data
            });
            const outputPath = url;
            const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;
            this.emitFile(outputPath, data);
            return `module.exports = ${publicPath}`;
        }
        else {
            const base64 = JSON.stringify("data:" + MIMES[ext] + ";" + "base64," + data.toString("base64"));
            return `module.exports = ${base64}`;
        }
    }
}
exports.default = default_1;
exports.raw = true;
//# sourceMappingURL=raster-image-loader.js.map