"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
class DefaultStorageService {
    persist(key, value) {
        n_defensive_1.given(key, "key").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        key = key.trim();
        if (value === undefined || value === null) {
            localStorage.setItem(key, null);
            return;
        }
        let storeValue = { item: value };
        localStorage.setItem(key, JSON.stringify(storeValue));
    }
    persistInSession(key, value) {
        n_defensive_1.given(key, "key").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        key = key.trim();
        if (value === undefined || value === null) {
            sessionStorage.setItem(key, null);
            return;
        }
        let storeValue = { item: value };
        sessionStorage.setItem(key, JSON.stringify(storeValue));
    }
    retrieve(key) {
        n_defensive_1.given(key, "key").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        key = key.trim();
        let value = localStorage.getItem(key);
        if (value === undefined || value === null)
            return null;
        let parsedValue = JSON.parse(value);
        return parsedValue.item;
    }
    retrieveFromSession(key) {
        n_defensive_1.given(key, "key").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        key = key.trim();
        let value = sessionStorage.getItem(key);
        if (value === undefined || value === null)
            return null;
        let parsedValue = JSON.parse(value);
        return parsedValue.item;
    }
    remove(key) {
        n_defensive_1.given(key, "key").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        key = key.trim();
        localStorage.removeItem(key);
    }
    removeFromSession(key) {
        n_defensive_1.given(key, "key").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        key = key.trim();
        sessionStorage.removeItem(key);
    }
}
exports.DefaultStorageService = DefaultStorageService;
//# sourceMappingURL=default-storage-service.js.map