const Hook = require("./Hook");
function SyncHook(args = [], name = undefined) {
  let hook = new Hook(args, name);
  hook.compile = COMPILE;
  return hook;
}
SyncHook.prototype = null;
module.exports = SyncHook