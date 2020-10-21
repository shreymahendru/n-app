"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nivinjoseph/n-ext");
const Sharp = require("sharp");
const loaderUtils = require("loader-utils");
const Path = require("path");
const n_util_1 = require("@nivinjoseph/n-util");
const imagemin = require("imagemin");
function resize(data, width, height, format, jpegQuality) {
    const promise = new Promise((resolve, reject) => {
        let s = Sharp(data);
        if (width || height)
            s = s.resize(width, height);
        if (format === "jpeg")
            s = s.jpeg({ quality: jpegQuality });
        s.toBuffer((err, buf, info) => {
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
module.exports = function (content) {
    this.cacheable && this.cacheable();
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
    const { width, height, format } = parsedResourceQuery;
    const options = loaderUtils.getOptions(this) || {};
    const jpegQuality = options.jpegQuality || 80;
    const pngQuality = Number.parseFloat(((options.pngQuality || 80) / 100).toFixed(1));
    const callback = this.async();
    const plugins = [
        require("imagemin-gifsicle")({}),
        require("imagemin-mozjpeg")({ quality: jpegQuality }),
        require("imagemin-pngquant")({ quality: [pngQuality, pngQuality] }),
    ];
    resize(content, width, height, format, jpegQuality)
        .then(resized => imagemin.buffer(resized.data, { plugins }))
        .then(data => callback(null, data))
        .catch(e => callback(e));
};
module.exports.raw = true;
//# sourceMappingURL=raster-image-loader.js.map