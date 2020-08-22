import { Middleware } from "natur";
import Store from "./Store";
import Keys from "./Keys";

type Data = { [m: string]: any };

type CreateLocalStorageMiddleware = {
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

function createPersistMiddleware({
  name = "natur",
  time = 100,
  exclude,
  include,
  specific = {},
  setItem,
  getItem,
  removeItem,
}: CreateLocalStorageMiddleware) {
  const store = new Store({
    set: setItem,
    get: getItem,
    remove: removeItem,
  });

  let lsData: Data | undefined;
  const dataPrefix = `${name}/`;
  const keys = new Keys(store, dataPrefix);
  const isSaving: any = {};

  const debounceSave = (key: string | number, data: any) => {
    const _time = specific[key] !== undefined ? specific[key] : time;
    if (_time === 0) {
      store.set(`${dataPrefix}${key}`, data);
    } else {
      clearTimeout(isSaving[key]);
      isSaving[key] = setTimeout(
        () => store.set(`${dataPrefix}${key}`, data),
        time
      );
    }
  };
  const excludeModule = (targetName: string) => {
    if (exclude) {
      const shouldExclude = exclude.some((exc) => {
        if (exc instanceof RegExp) {
          return exc.test(targetName);
        }
        return exc === targetName;
      });
      return shouldExclude;
    }
    return false;
  };
  const includeModule = (targetName: string) => {
    if (include) {
      const shouldInclude = include.some((exc) => {
        if (exc instanceof RegExp) {
          return exc.test(targetName);
        }
        return exc === targetName;
      });
      return shouldInclude;
    }
    return true;
  };

  const init = (async () => {
    // 同步excludeModule、includeModule配置到keys
    const keyValue = (await keys.value) || [];
    await Promise.all(
      keyValue.map(async (m) => {
        if (excludeModule(m) || !includeModule(m)) {
          await keys.remove(m);
          await store.remove(`${dataPrefix}${m}`);
        }
      })
    );
    // 初始化key，读取storage中的数据
    const keyNames = await keys.get();
    if (keyNames.length) {
      if (lsData === undefined) {
        lsData = {};
      }
      await Promise.all(
        keyNames.map(async (key) => {
          // @ts-ignore
          lsData[key.replace(dataPrefix, "")] = await store.get(key);
        })
      );
    }
  })();

  const updateData = (
    data: Data,
    record: { moduleName: string; state: any }
  ) => {
    const { moduleName, state } = record;
    if (excludeModule(moduleName)) {
      return;
    }
    if (includeModule(moduleName)) {
      keys.set(moduleName);
      data[moduleName] = state;
      debounceSave(moduleName, state);
    }
  };
  const lsMiddleware: Middleware = () => (next) => (record) => {
    init.then(() => {
      if (lsData === undefined) {
        lsData = {};
      }
      updateData(lsData as Data, record as any);
    });
    return next(record);
  };
  const clearData = async () => {
    lsData = undefined;
    const keyNames = await keys.get();
    await Promise.all(
      keyNames.map(async (moduleName: string) => store.remove(moduleName))
    );
    await keys.clear();
  };

  const getData = async function () {
    await init;
    return lsData;
  };

  return {
    middleware: lsMiddleware,
    getData,
    clearData,
  };
}

export default createPersistMiddleware;
