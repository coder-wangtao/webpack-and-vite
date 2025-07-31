var modules = {
  "./src/name.js": (module) => {
    module.exports = "不要秃头啊";
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

require.n = (module) => {
  var getter =
    module && module.__esModule ? () => module["default"] : () => module;
  require.defineProperty(getter, {
    a: getter,
  });
  return getter;
};

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

var __webpack_exports__ = {};
(() => {
  "use strict";
  require.setModuleTag(__webpack_exports__);
  var _name__WEBPACK_IMPORTED_MODULE_0__ = require("./src/name.js");
  var _name__WEBPACK_IMPORTED_MODULE_0___default = require.n(
    _name__WEBPACK_IMPORTED_MODULE_0__
  );
  console.log(_name__WEBPACK_IMPORTED_MODULE_0___default(), "author");
})();
