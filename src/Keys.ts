import Store from './Store';


export default class Keys {
    value: Promise<Array<string>>;
    store: Store;
    name: string;
    prefix: string;
    constructor(store: Store, dataPrefix: string) {
        this.store = store;
        this.prefix = dataPrefix;
        this.name = `${dataPrefix}$keys`;
        this.value = store.get(this.name, []);
    }
    async set(moduleName: string) {
        if(this.has(moduleName)) {
            return;
        }
        const v = await this.value;
        v.push(moduleName);
        await this.store.set(this.name, v);
    }
    async has(moduleName: string) {
        const v = await this.value;
        return v.includes(moduleName);
    }
    async remove(moduleName: string) {
        const hasModule = await this.has(moduleName);
        if (hasModule) {
            const v = await this.value;
            const newValue = v.filter(m => m !== moduleName);
            this.value = Promise.resolve(newValue);
            return this.store.set(this.name, newValue);
        }
    }
    async get() {
        const v = await this.value;
        return v.map((mn: string) => `${this.prefix}${mn}`);
    }
    async clear() {
        this.value = Promise.resolve([]);
        await this.store.remove(this.name);
    }
}