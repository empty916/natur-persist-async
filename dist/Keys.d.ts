import Store from "./Store";
export default class Keys {
    value: Promise<Array<string>>;
    store: Store;
    name: string;
    prefix: string;
    constructor(store: Store, dataPrefix: string);
    set(moduleName: string): Promise<void>;
    has(moduleName: string): Promise<boolean>;
    remove(moduleName: string): Promise<any>;
    get(): Promise<string[]>;
    clear(): Promise<void>;
}
