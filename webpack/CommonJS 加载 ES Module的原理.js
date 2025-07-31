var modules = {
  "./src/name.js": (module, exports, require) => {
    require.setModuleTag(exports);
    require.defineProperty(exports, {
      age: () => age,
      default: () => DEFAULT_EXPORT,
    });
    const age = 18;
    const DEFAULT_EXPORT = "不要秃头啊";
  },
};
var cache = {};
function require(moduleId) {
  var cachedModule = cache[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  var module = (cache[moduleId] = {
    exports: {},
  });
  modules[moduleId](module, module.exports, require);
  return module.exports;
}

require.defineProperty = (exports, definition) => {
  for (var key in definition) {
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: definition[key],
    });
  }
};

require.setModuleTag = (exports) => {
  Object.defineProperty(exports, Symbol.toStringTag, {
    value: "Module",
  });

  Object.defineProperty(exports, "__esModule", {
    value: true,
  });
};

(() => {
  let obj = require("./src/name.js");
  console.log(obj, "obj");
})();
