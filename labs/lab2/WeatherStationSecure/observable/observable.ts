import { IObserver } from "../observers/IObserver";

export interface IObservable<T> {
  registerObserver(observer: IObserver<T>): void;
  removeObserver(observer: IObserver<T>): void;
  notifyObservers(): void;
}

export abstract class Observable<T> implements IObservable<T> {
  // Классы-наследники должны перегрузить данный метод,
  // в котором возвращать информацию об изменениях в объекте
  protected abstract getChangedData(): T;

  public registerObserver(observer: IObserver<T>): void {
    this.observers.add(observer);
  }

  public notifyObservers(): void {
    const data: T = this.getChangedData();

    const copiedObservers = this.copyObservers(this.observers);

    copiedObservers.forEach((observer: IObserver<T>) => {
      observer.update(data);
    });

    this.observers = this.copyObservers(copiedObservers);
  }

  private copyObservers(originalObservers: Set<IObserver<T>>) {
    const copiedObservers = new Set<IObserver<T>>();
    for (const observer of originalObservers) {
      copiedObservers.add(observer);
    }

    return copiedObservers;
  }

  public removeObserver(observer: IObserver<T>): void {
    this.observers.delete(observer);
  }

  private observers: Set<IObserver<T>> = new Set();
}
