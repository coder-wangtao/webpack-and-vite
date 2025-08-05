let AsyncParallelHook = require("../../../webpack-project/node_modules/tapable/lib/AsyncParallelHook");

let hook = new AsyncParallelHook(["arg"]);
console.time("tapable");

hook.tapAsync("click1", function (arg, callback) {
  setTimeout(() => {
    console.log("click1执行完毕--->", arg);
    callback();
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
