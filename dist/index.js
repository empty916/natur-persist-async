var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import Store from "./Store";
import Keys from "./Keys";
function createPersistMiddleware(_a) {
    var _this = this;
    var _b = _a.name, name = _b === void 0 ? "natur" : _b, _c = _a.time, time = _c === void 0 ? 100 : _c, exclude = _a.exclude, include = _a.include, _d = _a.specific, specific = _d === void 0 ? {} : _d, setItem = _a.setItem, getItem = _a.getItem, removeItem = _a.removeItem;
    var store = new Store({
        set: setItem,
        get: getItem,
        remove: removeItem
    });
    var lsData;
    var dataPrefix = name + "/";
    var keys = new Keys(store, dataPrefix);
    var isSaving = {};
    var debounceSave = function (key, data) {
        var _time = specific[key] !== undefined ? specific[key] : time;
        if (_time === 0) {
            store.set("" + dataPrefix + key, data);
        }
        else {
            clearTimeout(isSaving[key]);
            isSaving[key] = setTimeout(function () { return store.set("" + dataPrefix + key, data); }, time);
        }
    };
    var excludeModule = function (targetName) {
        if (exclude) {
            var shouldExclude = exclude.some(function (exc) {
                if (exc instanceof RegExp) {
                    return exc.test(targetName);
                }
                return exc === targetName;
            });
            return shouldExclude;
        }
        return false;
    };
    var includeModule = function (targetName) {
        if (include) {
            var shouldInclude = include.some(function (exc) {
                if (exc instanceof RegExp) {
                    return exc.test(targetName);
                }
                return exc === targetName;
            });
            return shouldInclude;
        }
        return true;
    };
    var init = (function () { return __awaiter(_this, void 0, void 0, function () {
        var keyValue, keyNames;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, keys.value];
                case 1:
                    keyValue = (_a.sent()) || [];
                    return [4 /*yield*/, Promise.all(keyValue.map(function (m) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(excludeModule(m) || !includeModule(m))) return [3 /*break*/, 3];
                                        return [4 /*yield*/, keys.remove(m)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, store.remove("" + dataPrefix + m)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, keys.get()];
                case 3:
                    keyNames = _a.sent();
                    if (!keyNames.length) return [3 /*break*/, 5];
                    if (lsData === undefined) {
                        lsData = {};
                    }
                    return [4 /*yield*/, Promise.all(keyNames.map(function (key) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        // @ts-ignore
                                        _a = lsData;
                                        _b = key.replace(dataPrefix, "");
                                        return [4 /*yield*/, store.get(key)];
                                    case 1:
                                        // @ts-ignore
                                        _a[_b] = _c.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); })();
    var updateData = function (data, record) {
        var moduleName = record.moduleName, state = record.state;
        if (excludeModule(moduleName)) {
            return;
        }
        if (includeModule(moduleName)) {
            keys.set(moduleName);
            data[moduleName] = state;
            debounceSave(moduleName, state);
        }
    };
    var lsMiddleware = function () { return function (next) { return function (record) {
        init.then(function () {
            if (lsData === undefined) {
                lsData = {};
            }
            updateData(lsData, record);
        });
        return next(record);
    }; }; };
    var clearData = function () { return __awaiter(_this, void 0, void 0, function () {
        var keyNames;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lsData = undefined;
                    return [4 /*yield*/, keys.get()];
                case 1:
                    keyNames = _a.sent();
                    return [4 /*yield*/, Promise.all(keyNames.map(function (moduleName) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, store.remove(moduleName)];
                        }); }); }))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, keys.clear()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, init];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, lsData];
                }
            });
        });
    };
    return {
        middleware: lsMiddleware,
        getData: getData,
        clearData: clearData
    };
}
export default createPersistMiddleware;
