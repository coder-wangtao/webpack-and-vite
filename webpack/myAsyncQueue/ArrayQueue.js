class ArrayQueue {
  constructor() {
    this._list = [];
  }
  enqueue(entry) {
    this._list.push(entry);
  }
  dequeue() {
    return this._list.shift();
  }
}

module.exports = ArrayQueue;
