import "@nivinjoseph/n-ext";
import * as Sharp from "sharp";
const loaderUtils = require("loader-utils");
import * as Path from "path";
import { TypeHelper } from "@nivinjoseph/n-util";


interface ResizedImage
{
    // name: string;
    ext: string;
    width: number;
    height: number;
    size: number;
    data: Buffer;
}

function resize(filePath: string, width: number, height: number): Promise <ResizedImage>
{
    const promise = new Promise<ResizedImage>((resolve, reject) =>
    {
        Sharp(filePath)
            // .resize(width, height, {fit: "inside"})
            .resize(width, height)
            .toBuffer((err: any, buf: any, info) =>
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


// @ts-ignore
// tslint:disable-next-line: no-default-export
export default function (content: any)
{
    const MIMES: {[index: string]: string} = {
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
    
    const { width, height } = parsedResourceQuery;
    
    const options = loaderUtils.getOptions(this) || {};
    const context = options.context || this.rootContext;
    
    const limit = options.limit;
    
    if (width || height)
    {
        const callback = this.async();

        resize(this.resourcePath, width, height)
            .then(resized =>
            {
                const size = resized.size;
                
                // console.log("resized size", size);
                
                if (limit && size > limit)
                {                    
                    const url = loaderUtils.interpolateName(this, `[contenthash].${resized.ext}`, {
                        context,
                        content: resized.data
                    });

                    const outputPath = url;
                    const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;
   
                    this.emitFile(outputPath, resized.data);
                    
                    callback(null, `module.exports = ${publicPath}`);
                }
                else
                {
                    // console.log(resized.ext, resized.width, resized.height);
                    const base64 = JSON.stringify("data:" + MIMES[resized.ext] + ";" + "base64," + resized.data.toString("base64"));
                    callback(null, `module.exports = ${base64}`);
                }
            })
            .catch(e => callback(e));    
    }
    else
    {
        const data = typeof content === "string" ? Buffer.from(content) : content as Buffer;
        
        const size = data.byteLength;
        
        // console.log("actual size", size);
        
        if (limit && size > limit)
        {
            const url = loaderUtils.interpolateName(this, `[contenthash].${ext}`, {
                context,
                content: data
            });

            const outputPath = url;
            const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

            this.emitFile(outputPath, data);

            return `module.exports = ${publicPath}`;
        }
        else
        {
            const base64 = JSON.stringify("data:" + MIMES[ext] + ";" + "base64," + data.toString("base64"));
            return `module.exports = ${base64}`;    
        }
    }
}

export const raw = true;