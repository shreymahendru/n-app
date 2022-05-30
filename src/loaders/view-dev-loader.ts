/* eslint-disable @typescript-eslint/no-unsafe-call */
import { compileToFunctions } from "vue-template-compiler";


export default function extractLoader(src: string): string
{
    // @ts-expect-error: unsafe use of this
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    const filePath = this.resourcePath;
    console.log(filePath);
    
    console.log(src);
    
    const result = compileToFunctions(src);
    
    console.log(JSON.stringify((<any>result.render)[0]));
    
    
    return src;
    
    
    // const done = this.async();
    // // @ts-expect-error: unsafe use of this
    // const options = getOptions(this) || {};
    // // @ts-expect-error: unsafe use of this
    // const publicPath = getPublicPath(options, this);
    // // @ts-expect-error: unsafe use of this
    // this.cacheable();

    // try
    // {
    //     console.log(src);
    //     done(null, await evalDependencyGraph({
    //         // @ts-expect-error: unsafe use of this
    //         loaderContext: this,
    //         src,
    //         // @ts-expect-error: unsafe use of this
    //         filename: this.resourcePath,
    //         publicPath
    //     }));
    // }
    // catch (error)
    // {
    //     done(error);
    // }
}