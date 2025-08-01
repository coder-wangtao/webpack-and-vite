//模块定义
var modules = {
  "./src/name.js": (module, exports, require) => {
    //给该模块设置tag：标识这是一个ES Module
    require.setModuleTag(exports);
    //通过代理给exports设置属性值
    require.defineProperty(exports, {
      age: () => age,
      default: () => DEFAULT_EXPORT,
    });
    const author = "不要秃头啊";
    const age = "18";
    const DEFAULT_EXPORT = author;
  },
};

var cache = {};
function require(modulePath) {
  var cachedModule = cache[modulePath];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  var module = (cache[modulePath] = {
    exports: {},
  });
  modules[modulePath](module, module.exports, require);
  return module.exports;
}

//对exports对象做代理
require.defineProperty = (exports, definition) => {
  for (var key in definition) {
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: definition[key],
    });
  }
};

//标识模块的类型为ES Module
require.setModuleTag = (exports) => {
  Object.defineProperty(exports, Symbol.toStringTag, {
    value: "Module",
  });

  Object.defineProperty(exports, "__esModule", {
    value: true,
  });
};

//以下是main.js编译后的代码
//拿到模块导出对象exports
var _name__WEBPACK_IMPORTED_MODULE_0__ = require("./src/name.js");

console.log(_name__WEBPACK_IMPORTED_MODULE_0__["default"], "author");
console.log(_name__WEBPACK_IMPORTED_MODULE_0__.age, "age");

// 通过 require.setModuleTag 函数来标识这是一个ES Module(在现在这个例子中其实没什么作用)
//给传入的 exports 对象通过 Object.defineProperty 做了一层代理。
//(这样当访问default属性时，其实访问的是DEFAULT_EXPORT变量，访问age属性时，访问的是age变量）。
