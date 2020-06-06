type Data = any;

type StoreParams = {
  set(name: string, data: Data): Promise<any>;
  get(name: string): Promise<Data>;
  remove(name: string): Promise<any>;
};

export default class Store {
  private $set: StoreParams["set"];

  private $get: StoreParams["get"];

  private $remove: StoreParams["remove"];

  constructor({ set, get, remove }: StoreParams) {
    this.$set = set;
    this.$get = get;
    this.$remove = remove;
  }

  async set(name: string, data: Data) {
    return this.$set(name, data);
  }

  async get<T>(name: string, defaultValue: T = {} as any): Promise<T> {
    try {
      return (await this.$get(name)) as T;
    } catch {
      return defaultValue;
    }
  }

  async remove(name: string) {
    return this.$remove(name);
  }
}
