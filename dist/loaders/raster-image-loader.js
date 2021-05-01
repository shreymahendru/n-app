"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nivinjoseph/n-ext");
const Sharp = require("sharp");
const loaderUtils = require("loader-utils");
const Path = require("path");
const n_util_1 = require("@nivinjoseph/n-util");
const imagemin = require("imagemin");
function resize(data, width, height, format, jpegQuality, background) {
    const promise = new Promise((resolve, reject) => {
        let s = Sharp(data);
        if (width || height)
            s = s.resize(width, height);
        if (format === "jpeg") {
            if (background) {
                background = background.toString().trim();
                if (background.startsWith("#") && (background.length === 7 || background.length === 4)) {
                    s = s.flatten({
                        background
                    });
                }
                else {
                    console.warn("SUPPLIED BACKGROUND PARAMETER IS NOT A VALID HEX COLOR.");
                }
            }
            s = s.jpeg({ quality: jpegQuality });
        }
        s.toBuffer((err, buf, info) => {
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
module.exports = function (content) {
    this.cacheable && this.cacheable();
    const MIMES = {
        "jpg": "image/jpeg",
        "jpeg": "image/jpeg",
        "png": "image/png",
        "gif": "image/gif",
        "webp": "image/webp",
        "svg": "image/svg+xml"
    };
    const ext = Path.extname(this.resourcePath).replace(/\./, "").toLowerCase();
    if (!MIMES[ext])
        throw new Error(`Unsupported format for file '${this.resourcePath}'`);
    const parsedResourceQuery = this.resourceQuery ? loaderUtils.parseQuery(this.resourceQuery) : {};
    Object.keys(parsedResourceQuery)
        .filter(t => ["width", "height"].contains(t))
        .forEach(t => parsedResourceQuery[t] = n_util_1.TypeHelper.parseNumber(parsedResourceQuery[t]));
    const { width, height, format, background } = parsedResourceQuery;
    const options = loaderUtils.getOptions(this) || {};
    // const context = options.context || this.rootContext;
    // const limit = options.urlEncodeLimit;
    const jpegQuality = options.jpegQuality || 80;
    const pngQuality = Number.parseFloat(((options.pngQuality || 80) / 100).toFixed(1));
    // console.log("LIMIT", limit);
    const callback = this.async();
    const plugins = [
        require("imagemin-gifsicle")({}),
        require("imagemin-mozjpeg")({ quality: jpegQuality }),
        require("imagemin-svgo")({}),
        require("imagemin-pngquant")({ quality: [pngQuality, pngQuality] }),
        // require("imagemin-optipng")({}),
        require("imagemin-webp")({})
    ];
    resize(content, width, height, ext === "svg" ? "jpeg" : format, jpegQuality, background)
        .then(resized => imagemin.buffer(resized.data, { plugins }))
        .then(data => callback(null, data))
        .catch(e => callback(e));
};
module.exports.raw = true;
//# sourceMappingURL=raster-image-loader.js.map