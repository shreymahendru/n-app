"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_exception_1 = require("n-exception");
require("n-ext");
const property_info_1 = require("./property-info");
class Utilities {
    static getPropertyInfos(val) {
        let propertyInfos = new Array();
        let prototype = Object.getPrototypeOf(val);
        if (prototype === undefined || prototype === null)
            return propertyInfos;
        let internal = ["ctx", "onCreate", "onMount", "onDestroy", "executeOnCreate", "executeOnDestroy",
            "watch", "unWatch", "getBound", "onEnter", "onLeave"];
        let forbidden = ["do", "if", "for", "let", "new", "try", "var", "case", "else", "with", "await", "break",
            "catch", "class", "const", "super", "throw", "while", "yield", "delete", "export", "import", "return",
            "switch", "default", "extends", "finally", "continue", "debugger", "function", "arguments", "typeof", "void"];
        let propertyNames = Object.getOwnPropertyNames(val);
        for (let name of propertyNames) {
            name = name.trim();
            if (name === "constructor" || name.startsWith("_") || name.startsWith("$") || internal.some(t => t === name))
                continue;
            if (forbidden.some(t => t === name))
                throw new n_exception_1.ApplicationException(`Class ${val.getTypeName()} has a member with the forbidden name '${name}'. The following names are forbidden: ${forbidden}.`);
            let descriptor = Object.getOwnPropertyDescriptor(val, name);
            propertyInfos.push(new property_info_1.PropertyInfo(name, descriptor));
        }
        propertyInfos.push(...Utilities.getPropertyInfos(prototype));
        return propertyInfos;
    }
}
exports.Utilities = Utilities;
//# sourceMappingURL=utilities.js.map