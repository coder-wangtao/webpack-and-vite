const SyncHook = require("./SyncHook");

module.exports = SyncHook;

//编译执行懒执行 学习
//继承 学习
// 做一部分原因是为了极佳的性能考虑，比如只有在执行 call 方法时才会去动态生成执行函数，如果不执行则不处理（懒编译或者叫动态编译）。
// 还有一部分原因则是为了更加灵活。别忘了，该库里面还有其他类型的 Hook，如果我们想要实现其他 Hook，只需要定义好各自的 compiler 函数就可以了。
// https://github.com/webpack/tapable/issues/162
//使用 new Function 创建的函数，由于更优的编译优化和减少的函数调用开销，往往在性能上优于简单的 forEach 循环调用。
// 然而，这种优化的程度可能会因 JavaScript 引擎的实现细节而有所不同，而且它也带来了代码的复杂性和可维护性的挑战。在实际应用中，选择哪种方法取决于具体场景和性能需求。
