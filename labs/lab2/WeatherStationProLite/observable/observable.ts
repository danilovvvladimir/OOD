import { IObserver } from "../observers/IObserver";

export interface IObservable<T, Event> {
  registerObserver(observer: IObserver<T>, event: Event): void;
  removeObserver(observer: IObserver<T>, event: Event): void;
  notifyObservers(): void;
}

export abstract class Observable<T, Event> implements IObservable<T, Event> {
  // Классы-наследники должны перегрузить данный метод,
  // в котором возвращать информацию об изменениях в объекте
  protected abstract getChangedData(): T;
  protected abstract getCurrentEvents(): Set<Event>;

  public registerObserver(observer: IObserver<T>, event: Event): void {
    if (!this.observers.has(event)) {
      this.observers.set(event, new Set<IObserver<T>>());
    }

    this.observers.get(event)?.add(observer);
  }

  public notifyObservers(): void {
    const data: T = this.getChangedData();
    const currentEvents: Set<Event> = this.getCurrentEvents();

    const observersCopy = this.observers;

    for (const event of currentEvents) {
      const neededSet = observersCopy.get(event);
      if (neededSet) {
        neededSet.forEach((o) => {
          o.update(data);
        });
      }
    }
  }

  public removeObserver(observer: IObserver<T>, event: Event): void {
    const eventObservers = this.observers.get(event);

    if (eventObservers) {
      eventObservers.delete(observer);
    }
  }

  private observers: Map<Event, Set<IObserver<T>>> = new Map();
}
