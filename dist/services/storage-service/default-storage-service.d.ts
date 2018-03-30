import { StorageService } from "./storage-service";
export declare class DefaultStorageService implements StorageService {
    persist(key: string, value: any): void;
    persistInSession(key: string, value: any): void;
    retrieve(key: string): any;
    retrieveFromSession(key: string): any;
    remove(key: string): void;
    removeFromSession(key: string): void;
}
