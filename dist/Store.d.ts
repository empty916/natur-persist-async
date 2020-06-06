declare type Data = any;
declare type StoreParams = {
    set(name: string, data: Data): Promise<any>;
    get(name: string): Promise<Data>;
    remove(name: string): Promise<any>;
};
export default class Store {
    private $set;
    private $get;
    private $remove;
    constructor({ set, get, remove }: StoreParams);
    set(name: string, data: Data): Promise<any>;
    get<T>(name: string, defaultValue?: T): Promise<T>;
    remove(name: string): Promise<any>;
}
export {};
