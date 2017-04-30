export class Config
{
    private static _isDev: boolean = false;
    
    
    public static get isDev(): boolean { return Config._isDev; }
    
    
    public static enableDev(vue: any): void
    {
        vue.config.silent = true;
        vue.config.devtools = true;
        vue.config.performance = true;
        vue.config.productionTip = true;
        Config._isDev = true;
    }
}