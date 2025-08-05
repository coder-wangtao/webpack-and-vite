let SyncWaterfallHook = require("../../../webpack-project/node_modules/tapable/lib/SyncWaterfallHook");

let hook = new SyncWaterfallHook(["arg"]);

hook.tap("click1", function (arg) {
  console.log("click1触发了====>", arg);
  return "嘻嘻";
});
hook.tap("click2", function (arg) {
  console.log("click2触发了====>", arg);
  return "哈哈";
});
hook.tap("click3", function (arg) {
  console.log("click3触发了====>", arg);
});

hook.call("hello tapable");
