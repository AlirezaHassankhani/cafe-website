class Counter {
    count = 0;
    constructor(count) {
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
    setCount(count) {
        this.count = count;
    }
    getCount() {
        return this.count;
    }
}
export default Counter;
