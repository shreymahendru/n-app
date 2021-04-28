"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utilities = void 0;
const n_exception_1 = require("@nivinjoseph/n-exception");
require("@nivinjoseph/n-ext");
const property_info_1 = require("./property-info");
class Utilities {
    static getPropertyInfos(val) {
        let propertyInfos = new Array();
        let prototype = Object.getPrototypeOf(val);
        if (prototype === undefined || prototype === null) // we are dealing with Object
            return propertyInfos;
        propertyInfos.push(...Utilities.getPropertyInfos(prototype));
        let propertyNames = Object.getOwnPropertyNames(val);
        for (let name of propertyNames) {
            name = name.trim();
            if (name === "constructor" || name.startsWith("_") || name.startsWith("$") || Utilities.internal.some(t => t === name))
                continue;
            if (Utilities.forbidden.some(t => t === name))
                throw new n_exception_1.ApplicationException(`Class ${val.getTypeName()} has a member with the forbidden name '${name}'. The following names are forbidden: ${Utilities.forbidden}.`);
            let descriptor = Object.getOwnPropertyDescriptor(val, name);
            propertyInfos.push(new property_info_1.PropertyInfo(name, descriptor));
        }
        return propertyInfos;
    }
}
exports.Utilities = Utilities;
Utilities.internal = ["ctx", "onCreate", "onMount", "onDestroy", "executeOnCreate", "executeOnDestroy",
    "watch", "unWatch", "bindings", "getBound", "getBoundModel", "setBoundModel", "pathArgs", "queryArgs", "onEnter", "onLeave"];
Utilities.forbidden = ["do", "if", "for", "let", "new", "try", "var", "case", "else", "with", "await", "break",
    "catch", "class", "const", "super", "throw", "while", "yield", "delete", "export", "import", "return",
    "switch", "default", "extends", "finally", "continue", "debugger", "function", "arguments", "typeof", "void"];
//# sourceMappingURL=utilities.js.map