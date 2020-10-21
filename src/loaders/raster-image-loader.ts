import "@nivinjoseph/n-ext";
import * as Sharp from "sharp";
const loaderUtils = require("loader-utils");
import * as Path from "path";
import { TypeHelper } from "@nivinjoseph/n-util";
const imagemin = require("imagemin");


interface ResizedImage
{
    // name: string;
    ext: string;
    width: number;
    height: number;
    size: number;
    data: Buffer;
}

function resize(data: Buffer, width: number, height: number, format: string, jpegQuality: number): Promise<ResizedImage>
{
    const promise = new Promise<ResizedImage>((resolve, reject) =>
    {
        let s = Sharp(data);
        if (width || height)
            s = s.resize(width, height);

        if (format === "jpeg")
            s = s.jpeg({ quality: jpegQuality });

        s.toBuffer((err: any, buf: any, info) =>
        {
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



module.exports = function (content: any)
{
    this.cacheable && this.cacheable();
    
    const MIMES: { [index: string]: string } = {
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
        .forEach(t => parsedResourceQuery[t] = TypeHelper.parseNumber(parsedResourceQuery[t]));

    const { width, height, format } = parsedResourceQuery;

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
        // require("imagemin-svgo")({}),
        require("imagemin-pngquant")({ quality: [pngQuality, pngQuality] }),
        // require("imagemin-optipng")({}),
        // require("imagemin-webp")({})
    ];

    resize(content, width, height, format, jpegQuality)
        .then(resized => imagemin.buffer(resized.data, { plugins }))
        .then(data => callback(null, data))
        .catch(e => callback(e));
};

module.exports.raw = true;