let SyncLoopHook = require("../../../webpack-project/node_modules/tapable/lib/SyncLoopHook");

let hook = new SyncLoopHook(["arg"]);

let flag1 = 1;
let flag2 = 1;

hook.tap("click1", function (arg) {
  console.log("click1触发了====>", arg);
  if (flag1 !== 2) {
    return flag1++;
  }
});
hook.tap("click2", function (arg) {
  console.log("click2触发了====>", arg);
  if (flag2 !== 3) {
    return flag2++;
  }
});
hook.tap("click3", function (arg) {
  console.log("click3触发了====>", arg);
});

hook.call("hello tapable");
