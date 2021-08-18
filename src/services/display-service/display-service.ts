import { DisplayType } from "./display-type";


export interface DisplayService
{
    /**
     * @description The type of display used; 1 - Desktop, 2 - Tablet, 3 - Phone.
     */
    CurrentDisplayType: DisplayType;
    /**
     * @description The current display width.
     */
    CurrentDisplayWidth: number;
    /**
     * @description The current display height.
     */
    CurrentDisplayHeight: number;
}