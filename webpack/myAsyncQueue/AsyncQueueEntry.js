const QUEUE_STATE = 0;
const PROCESSING_STATE = 1;
const DONE_STATE = 3;

class AsyncQueueEntry {
  constructor(item, callback) {
    this.item = item;
    this.callback = callback;
    this.state = QUEUE_STATE;
    this.error = undefined;
    this.result = undefined;
    this.callbacks = [];
  }
}

module.exports = AsyncQueueEntry;
