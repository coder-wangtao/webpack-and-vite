// let SyncHook = require("../../../webpack-project/node_modules/tapable/lib/SyncHook");
let SyncHook = require("../../myTapable/index");

let hook = new SyncHook(["arg"]);

hook.tap("click1", function (arg) {
  console.log("click1触发了====>", arg);
});
hook.tap("click2", function (arg) {
  console.log("click2触发了====>", arg);
});
hook.tap("click3", function (arg) {
  console.log("click3触发了====>", arg);
});

hook.call("hello tapable");
