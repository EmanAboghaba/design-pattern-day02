interface Iterator<T> {
  hasNext(): boolean;
  next(): T;
}

class RangeIterator implements Iterator<number> {
  private current: number;
  private end: number;
  private step: number;
  constructor(start: number, end: number, step: number = 1) {
    this.current = start;
    this.end = end;
    this.step = step;
  }

  public hasNext(): boolean {
    return this.step > 0 ? this.current < this.end : this.current > this.end;
  }

  public next(): number {
    const value = this.current;
    this.current += this.step;
    return value;
  }
}

const range = new RangeIterator(0, 10, 2);

while (range.hasNext()) {
  console.log(range.next());
}
