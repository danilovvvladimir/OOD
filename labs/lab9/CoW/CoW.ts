class CoW<T> {
  private shared: T;

  constructor(shared: T) {
    this.shared = shared;
  }

  public getShared(): T {
    return this.shared;
  }

  public setShared(shared: T): void {
    this.shared = shared;
  }
}

export default CoW;
