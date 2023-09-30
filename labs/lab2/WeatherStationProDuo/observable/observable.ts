import { IObserver } from "../observers/IObserver";

export interface IObservable<T> {
  registerObserver(observer: IObserver<T>, priority: number): void;
  removeObserver(observer: IObserver<T>): void;
  notifyObservers(): void;
}

export abstract class Observable<T> implements IObservable<T> {
  protected abstract getChangedData(): T;

  public registerObserver(observer: IObserver<T>, priority: number): void {
    if (this.isObserverExist(observer)) {
      return;
    }

    if (!this.observers.has(priority)) {
      this.observers.set(priority, new Set<IObserver<T>>());
    }

    this.observers.get(priority).add(observer);
  }

  private isObserverExist(observer: IObserver<T>): boolean {
    this.observers.forEach((observerSet) => {
      if (observerSet.has(observer)) {
        return true;
      }
    });

    return false;
  }

  public notifyObservers(): void {
    const data: T = this.getChangedData();

    const priorities = Array.from(this.observers.keys()).sort((a, b) => b - a);

    for (const priority of priorities) {
      this.observers.get(priority)?.forEach((o) => {
        o.update(data, this);
      });
    }
  }

  public removeObserver(observer: IObserver<T>): void {
    this.observers.forEach((o) => o.delete(observer));
  }

  private observers: Map<number, Set<IObserver<T>>> = new Map();
}
