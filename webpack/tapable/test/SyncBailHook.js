let SyncBailHook = require("../../../webpack-project/node_modules/tapable/lib/SyncBailHook");

let hook = new SyncBailHook(["arg"]);

hook.tap("click1", function (arg) {
  console.log("click1触发了====>", arg);
});
hook.tap("click2", function (arg) {
  console.log("click2触发了====>", arg);
  return "click2";
});
hook.tap("click3", function (arg) {
  console.log("click3触发了====>", arg);
});

hook.call("hello tapable");
