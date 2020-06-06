import { Middleware } from 'natur';
declare type Data = {
    [m: string]: any;
};
declare type CreateLocalStorageMiddleware = {
    name?: string;
    time?: number;
    exclude?: Array<RegExp | string>;
    include?: Array<RegExp | string>;
    specific?: {
        [n: string]: number;
    };
    setStore: (name: string, data: Data) => Promise<void>;
    getStore: (name: string) => Promise<any>;
    removeStore: (name: string) => Promise<void>;
};
declare function createPersistMiddleware({ name, time, exclude, include, specific, setStore, getStore, removeStore, }: CreateLocalStorageMiddleware): {
    middleware: Middleware;
    getData: () => Promise<Data | undefined>;
    clearData: () => Promise<void>;
};
export default createPersistMiddleware;
