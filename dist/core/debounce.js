"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
const tslib_1 = require("tslib");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const n_util_1 = require("@nivinjoseph/n-util");
function debounce(delayMsOrTarget, propertyKey, descriptor) {
    (0, n_defensive_1.given)(delayMsOrTarget, "delayMsOrTarget").ensureHasValue();
    if (typeof delayMsOrTarget === "number") {
        const delay = delayMsOrTarget;
        return function (target, propertyKey, descriptor) {
            (0, n_defensive_1.given)(target, "target").ensureHasValue().ensureIsObject();
            (0, n_defensive_1.given)(propertyKey, "propertyKey").ensureHasValue().ensureIsString();
            (0, n_defensive_1.given)(descriptor, "descriptor").ensureHasValue().ensureIsObject();
            const original = descriptor.value;
            descriptor.value = function (...params) {
                return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                    const activeKey = `_$_${propertyKey}_isActive`;
                    if (!this[activeKey]) {
                        this[activeKey] = true;
                        try {
                            return yield original.call(this, ...params);
                        }
                        finally {
                            yield n_util_1.Delay.milliseconds(delay);
                            this[activeKey] = false;
                        }
                    }
                });
            };
        };
    }
    else {
        (0, n_defensive_1.given)(delayMsOrTarget, "delayMsOrTarget").ensureIsObject();
        (0, n_defensive_1.given)(propertyKey, "propertyKey").ensureHasValue().ensureIsString();
        (0, n_defensive_1.given)(descriptor, "descriptor").ensureHasValue().ensureIsObject();
        const original = descriptor.value;
        descriptor.value = function (...params) {
            return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                const activeKey = `_$_${propertyKey}_isActive`;
                if (!this[activeKey]) {
                    this[activeKey] = true;
                    try {
                        return yield original.call(this, ...params);
                    }
                    finally {
                        this[activeKey] = false;
                    }
                }
            });
        };
    }
}
exports.debounce = debounce;
//# sourceMappingURL=debounce.js.map