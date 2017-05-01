import { StorageService } from "./storage-service";
import { given } from "n-defensive";


export class DefaultStorageService implements StorageService
{
    public persist(key: string, value: any): void
    {
        given(key, "key").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        key = key.trim();
        
        if (value === undefined || value === null)
        {
            localStorage.setItem(key, null);
            return;
        }    
        
        let storeValue = { item: value };
        localStorage.setItem(key, JSON.stringify(storeValue));
    }

    public persistInSession(key: string, value: any): void
    {
        given(key, "key").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        key = key.trim();
        
        if (value === undefined || value === null)
        {
            sessionStorage.setItem(key, null);
            return;
        }
        
        let storeValue = { item: value };
        sessionStorage.setItem(key, JSON.stringify(storeValue));
    }

    public retrieve(key: string): any
    {
        given(key, "key").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        key = key.trim();
        
        let value = localStorage.getItem(key);
        if (value === undefined || value === null)
            return null;
        
        let parsedValue = JSON.parse(value);
        return parsedValue.item;
    }

    public retrieveFromSession(key: string): any
    {
        given(key, "key").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        key = key.trim();
        
        let value = sessionStorage.getItem(key);
        if (value === undefined || value === null)
            return null;
        
        let parsedValue = JSON.parse(value);
        return parsedValue.item;
    }

    public remove(key: string): void
    {
        given(key, "key").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        key = key.trim();
        
        localStorage.removeItem(key);
    }

    public removeFromSession(key: string): void
    {
        given(key, "key").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        key = key.trim();
        
        sessionStorage.removeItem(key);
    }
}