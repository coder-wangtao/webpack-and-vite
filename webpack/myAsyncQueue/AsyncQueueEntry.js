class AsyncQueueEntry {
  constructor(item, callback) {
    this.item = item;
    this.callback = callback;
  }
}

module.exports = AsyncQueueEntry;
