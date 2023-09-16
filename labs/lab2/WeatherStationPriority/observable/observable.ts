import { IObserver } from "../observers/IObserver";

export interface IObservable<T> {
  registerObserver(observer: IObserver<T>, priority: number): void;
  removeObserver(observer: IObserver<T>): void;
  notifyObservers(): void;
}

export abstract class Observable<T> implements IObservable<T> {
  // Классы-наследники должны перегрузить данный метод,
  // в котором возвращать информацию об изменениях в объекте
  protected abstract getChangedData(): T;

  public registerObserver(observer: IObserver<T>, priority: number): void {
    if (!this.observers.has(priority)) {
      this.observers.set(priority, new Set<IObserver<T>>());
    }

    this.observers.get(priority)?.add(observer);
  }

  public notifyObservers(): void {
    const data: T = this.getChangedData();

    const observersCopy = this.observers;

    const priorities = Array.from(observersCopy.keys()).sort((a, b) => b - a);

    for (const priority of priorities) {
      observersCopy.get(priority)?.forEach((o) => {
        o.update(data);
      });
    }
  }

  public removeObserver(observer: IObserver<T>): void {
    this.observers.forEach((o) => o.delete(observer));
  }

  private observers: Map<number, Set<IObserver<T>>> = new Map();
}
