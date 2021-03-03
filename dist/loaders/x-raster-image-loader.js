"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raw = void 0;
require("@nivinjoseph/n-ext");
const Sharp = require("sharp");
const loaderUtils = require("loader-utils");
const Path = require("path");
const n_util_1 = require("@nivinjoseph/n-util");
const imagemin = require("imagemin");
function resize(filePath, width, height, format, jpegQuality) {
    const promise = new Promise((resolve, reject) => {
        let s = Sharp(filePath);
        if (width || height)
            s = s.resize(width, height);
        if (format === "jpeg")
            s = s.jpeg({ quality: jpegQuality });
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
// @ts-ignore
// tslint:disable-next-line: no-default-export
module.exports = function (content) {
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
    const context = options.context || this.rootContext;
    const limit = options.urlEncodeLimit;
    const jpegQuality = options.jpegQuality || 80;
    const pngQuality = Number.parseFloat(((options.pngQuality || 80) / 100).toFixed(1));
    // console.log("LIMIT", limit);
    const callback = this.async();
    const plugins = [
        require("imagemin-gifsicle")({}),
        require("imagemin-mozjpeg")({ quality: jpegQuality }),
        // require("imagemin-svgo")({}),
        require("imagemin-pngquant")({ quality: [pngQuality, pngQuality] }),
        // require("imagemin-optipng")({}),
        // require("imagemin-webp")({})
    ];
    resize(this.resourcePath, width, height, format, jpegQuality)
        .then(resized => {
        // console.log("resized size", resized.size);
        // const url = loaderUtils.interpolateName(this, `[contenthash].${resized.ext}`, {
        //     context,
        //     content: resized.data
        // });
        // const outputPath = url;
        // const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;
        // this.emitFile(outputPath, resized.data);
        // callback(null, `module.exports = ${publicPath}`);
        imagemin.buffer(resized.data, { plugins })
            .then((data) => {
            const size = data.byteLength;
            // console.log("minified size", size);
            // const url = loaderUtils.interpolateName(this, `[contenthash].${resized.ext}`, {
            //     context,
            //     content: data
            // });
            // const outputPath = url;
            // const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;
            // this.emitFile(outputPath, data);
            // callback(null, `module.exports = ${publicPath}`);
            if (limit && size <= limit) {
                // console.log(resized.ext, resized.width, resized.height);
                const base64 = JSON.stringify("data:" + MIMES[resized.ext] + ";" + "base64," + data.toString("base64"));
                callback(null, `module.exports = ${base64}`);
            }
            else {
                const url = loaderUtils.interpolateName(this, `[contenthash].${resized.ext}`, {
                    context,
                    content: data
                });
                const outputPath = url;
                const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;
                this.emitFile(outputPath, data);
                callback(null, `module.exports = ${publicPath}`);
            }
        })
            .catch((e) => callback(e));
    })
        .catch(e => callback(e));
    // if (width || height)
    // {
    //     resize(this.resourcePath, width, height)
    //         .then(resized =>
    //         {
    //             // console.log("resized size", resized.size);
    //             imagemin.buffer(resized.data, { plugins })
    //                 .then((data: Buffer) =>
    //                 {
    //                     // const size = data.byteLength;
    //                     // console.log("minified size", size);
    //                     const url = loaderUtils.interpolateName(this, `[contenthash].${resized.ext}`, {
    //                         context,
    //                         content: data
    //                     });
    //                     const outputPath = url;
    //                     const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;
    //                     this.emitFile(outputPath, data);
    //                     callback(null, `module.exports = ${publicPath}`);
    //                     // if (limit && size > limit)
    //                     // {
    //                     //     const url = loaderUtils.interpolateName(this, `[contenthash].${resized.ext}`, {
    //                     //         context,
    //                     //         content: data
    //                     //     });
    //                     //     const outputPath = url;
    //                     //     const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;
    //                     //     this.emitFile(outputPath, data);
    //                     //     callback(null, `module.exports = ${publicPath}`);
    //                     // }
    //                     // else
    //                     // {
    //                     //     // console.log(resized.ext, resized.width, resized.height);
    //                     //     const base64 = JSON.stringify("data:" + MIMES[resized.ext] + ";" + "base64," + data.toString("base64"));
    //                     //     callback(null, `module.exports = ${base64}`);
    //                     // }
    //                 })
    //                 .catch((e: any) => callback(e));
    //         })
    //         .catch(e => callback(e));
    // }
    // else
    // {
    //     const original = typeof content === "string" ? Buffer.from(content) : content as Buffer;
    //     // console.log("original size", original.byteLength);
    //     imagemin.buffer(original, { plugins })
    //         .then((data: Buffer) =>
    //         {
    //             // const size = data.byteLength;
    //             // console.log("minified size", size);
    //             const url = loaderUtils.interpolateName(this, `[contenthash].${ext}`, {
    //                 context,
    //                 content: data
    //             });
    //             const outputPath = url;
    //             const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;
    //             this.emitFile(outputPath, data);
    //             callback(null, `module.exports = ${publicPath}`);
    //             // if (limit && size > limit)
    //             // {
    //             //     const url = loaderUtils.interpolateName(this, `[contenthash].${ext}`, {
    //             //         context,
    //             //         content: data
    //             //     });
    //             //     const outputPath = url;
    //             //     const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;
    //             //     this.emitFile(outputPath, data);
    //             //     callback(null, `module.exports = ${publicPath}`);
    //             // }
    //             // else
    //             // {
    //             //     const base64 = JSON.stringify("data:" + MIMES[ext] + ";" + "base64," + data.toString("base64"));
    //             //     callback(null, `module.exports = ${base64}`);
    //             // }
    //         })
    //         .catch((e: any) => callback(e));
    // }
};
exports.raw = true;
//# sourceMappingURL=x-raster-image-loader.js.map