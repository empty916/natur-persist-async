import { Middleware } from "natur";
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
    setItem: (name: string, data: Data) => Promise<void>;
    getItem: (name: string) => Promise<any>;
    removeItem: (name: string) => Promise<void>;
};
declare function createPersistMiddleware({ name, time, exclude, include, specific, setItem, getItem, removeItem, }: CreateLocalStorageMiddleware): {
    middleware: Middleware;
    getData: () => Promise<Data | undefined>;
    clearData: () => Promise<void>;
};
export default createPersistMiddleware;
