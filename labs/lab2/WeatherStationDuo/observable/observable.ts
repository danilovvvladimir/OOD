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

    const observersCopy = this.copyObservers(this.observers);

    const priorities = Array.from(observersCopy.keys()).sort((a, b) => b - a);

    for (const priority of priorities) {
      observersCopy.get(priority)?.forEach((o) => {
        o.update(data, this);
      });
    }

    this.observers = this.copyObservers(observersCopy);
  }

  private copyObservers(originalObservers: Map<number, Set<IObserver<T>>>) {
    const copiedObservers = new Map<number, Set<IObserver<T>>>();

    for (const [key, observers] of originalObservers.entries()) {
      const copiedSet = new Set<IObserver<T>>(observers);
      copiedObservers.set(key, copiedSet);
    }

    return copiedObservers;
  }

  public removeObserver(observer: IObserver<T>): void {
    this.observers.forEach((o) => o.delete(observer));
  }

  private observers: Map<number, Set<IObserver<T>>> = new Map();
}
