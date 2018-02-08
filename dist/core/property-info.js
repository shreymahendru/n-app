"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PropertyInfo {
    get name() { return this._name; }
    get descriptor() { return this._descriptor; }
    constructor(name, descriptor) {
        this._name = name;
        this._descriptor = descriptor;
    }
}
exports.PropertyInfo = PropertyInfo;
//# sourceMappingURL=property-info.js.map