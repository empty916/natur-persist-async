# rn-natur-persist

## natur状态管理器的异步持久化缓存中间件

- 同步操作有一定的延迟，使用防抖做同步操作

## demo

````typescript
import { createStore } from 'natur';
import createPersistMiddleware from 'rn-natur-persist';
import AsyncStorage from '@react-native-community/async-storage';


const { middleware, getData, clearData } = createPersistMiddleware({
  name: '_data', // localStorage命名前缀
  time: 500, // natur数据同步到localStorage的延迟
  exclude: ['module1', /^module2$/], // module1, module2不做持久化缓存
  include: ['module3', /^module4$/], // 只针对module3，module4做持久化缓存
  specific: {
    user: 0, // 用户模块的保存延迟为0，意为用户模块的数据同步到localStorage是同步的
  },
  setStore: async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  },
  getStore: async (key: string) => {
    try {
      await AsyncStorage.getItem(key);
    } catch (e) {
      // saving error
    }
  },
  removeStore: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // saving error
    }
  },
});

// clearData(); 清除缓存数据

const store = createStore(
  {},
  {}
  {}, // 获取localStorage中的缓存数据
  [
    middleware, // 使用中间件
  ],
);

// 同步缓存到store
getData().then(data => store.globalSetStates(data));

````