let AsyncSeriesBailHook = require("../../../webpack-project/node_modules/tapable/lib/AsyncSeriesBailHook");

let hook = new AsyncSeriesBailHook(["arg"]);
console.time("tapable");

hook.tapAsync("click1", function (arg, callback) {
  setTimeout(() => {
    console.log("click1执行完毕--->", arg);
    callback(null, "999");
  }, 1000);
});

hook.tapPromise("click2", function (arg) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("click2执行完--->", arg);
      resolve();
    }, 1000);
  });
});

hook.callAsync("哈哈", () => {
  console.log("执行完毕------");
  console.timeEnd("tapable");
});
