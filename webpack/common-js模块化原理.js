(() => {
  var modules = {
    "./src/name.js": (module) => {
      module.exports = "不要秃头啊";
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

  (() => {
    let author = require("./src/name.js");
    console.log(author, "author");
  })();
})();
