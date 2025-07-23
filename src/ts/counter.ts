interface ICounter {
  count: number;
}

class Counter {
  private count: number = 0;

  constructor(count: number) {
    this.count = count;
  }

  increase() {
    this.count++;
  }
  decrease() {
    if (this.count > 1) {
      this.count--;
    }
  }

  setCount(count: number) {
    this.count = count;
  }
  getCount() {
    return this.count;
  }
}

export default Counter;
