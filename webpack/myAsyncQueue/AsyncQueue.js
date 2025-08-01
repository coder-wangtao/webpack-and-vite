const ArrayQueue = require("./ArrayQueue");
const AsyncQueueEntry = require("./AsyncQueueEntry");

class AsyncQueue {
  constructor(options) {
    this.name = options.name;
    this.processor = options.processor;
    this.parallelism = options.parallelism;
    this.getKey = options.getKey;
    this._queued = new ArrayQueue();
    this._activeTasks = 0;
    //是否开启任务执行
    this._willEnsureProcessing = false;
  }
  add(item, callback) {
    //将参数封装为一个任务
    let newEntry = new AsyncQueueEntry(item, callback);
    this._queued.enqueue(newEntry);
  }
}
