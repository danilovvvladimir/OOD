import { IObserver } from "../observers/IObserver";

export interface IObservable<T> {
  registerObserver(observer: IObserver<T>, priority: number): void;
  removeObserver(observer: IObserver<T>): void;
  notifyObservers(): void;
}

export abstract class Observable<T> implements IObservable<T> {
  protected abstract getChangedData(): T;

  public registerObserver(observer: IObserver<T>, priority: number): void {
    // TODO [X]: Сделать, чтобы 1 наблюдатель только можно было подключать.
    if (this.isObserverExist(observer)) {
      return;
    }

    if (!this.observers.has(priority)) {
      this.observers.set(priority, new Set<IObserver<T>>());
    }

    this.observers.get(priority).add(observer);
  }
  // existObserver
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
        o.update(data);
      });
    }
  }

  public removeObserver(observer: IObserver<T>): void {
    // TODO [-]: сделать быстрое  удаление и быстрое удаление
    this.observers.forEach((o) => o.delete(observer));
  }

  private observers: Map<number, Set<IObserver<T>>> = new Map();
}
