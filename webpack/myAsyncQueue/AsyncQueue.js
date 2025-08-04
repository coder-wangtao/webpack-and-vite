const ArrayQueue = require("./ArrayQueue");
const AsyncQueueEntry = require("./AsyncQueueEntry");

const QUEUE_STATE = 0;
const PROCESSING_STATE = 1;
const DONE_STATE = 3;

class AsyncQueue {
  constructor(options) {
    this.name = options.name;
    this.processor = options.processor;
    this.parallelism = options.parallelism;
    this.getKey = options.getKey;
    this._queued = new ArrayQueue();
    this._entries = new Map();
    this._activeTasks = 0;
    //是否开启任务执行
    this._willEnsureProcessing = false;
  }
  add(item, callback) {
    let key = this.getKey(item);
    let entry = this._entries.get(key);
    if (entry) {
      if (entry.state === DONE_STATE) {
        process.nextTick(callback(entry.error, entry.result));
      } else {
        entry.callbacks.push(callback);
      }
      return;
    }
    //将参数封装为一个任务
    let newEntry = new AsyncQueueEntry(item, callback);
    this._queued.enqueue(newEntry);
    this._entries.set(key, newEntry);
    if (!this._willEnsureProcessing) {
      this._willEnsureProcessing = true;
      setImmediate(this._ensureProcessing.bind(this));
    }
  }

  _ensureProcessing() {
    while (this._activeTasks < this.parallelism) {
      let entry = this._queued.dequeue();
      if (!entry) {
        break;
      }
      this._activeTasks++;
      this._startProcess(entry);
      this.state = PROCESSING_STATE;
    }
    this._willEnsureProcessing = false;
  }
  _startProcess(entry) {
    this.processor(entry.item, (e, r) => {
      this._handleResult(entry, e, r);
    });
  }
  _handleResult(entry, e, r) {
    const callback = entry.callback;
    entry.state = DONE_STATE;
    entry.error = e;
    entry.result = r;
    callback(e, r);
    this._activeTasks--;
    if (entry.callbacks.length > 0) {
      for (const callback of entry.callbacks) {
        callback(e, r);
      }
    }
    if (!this._willEnsureProcessing) {
      this._willEnsureProcessing = true;
      setImmediate(this._ensureProcessing.bind(this));
    }
  }
}

module.exports = AsyncQueue;
