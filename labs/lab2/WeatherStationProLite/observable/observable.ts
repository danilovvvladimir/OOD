import { IObserver } from "../observers/IObserver";

export interface IObservable<T, EventType> {
  registerObserver(observer: IObserver<T>, event: EventType): void;
  removeObserver(observer: IObserver<T>, event: EventType): void;
  notifyObservers(): void;
}
// TODO [-]: Сохранить приоритеты
// TODO [X]: Eventtype
export abstract class Observable<T, EventType>
  implements IObservable<T, EventType>
{
  protected abstract getChangedData(): T;
  protected abstract getCurrentEvents(): Set<EventType>;

  public registerObserver(observer: IObserver<T>, event: EventType): void {
    if (!this.observers.has(event)) {
      this.observers.set(event, new Set<IObserver<T>>());
    }

    this.observers.get(event)?.add(observer);
  }

  public notifyObservers(): void {
    const data: T = this.getChangedData();
    const currentEvents: Set<EventType> = this.getCurrentEvents();

    for (const event of currentEvents) {
      const neededSet = this.observers.get(event);
      if (neededSet) {
        neededSet.forEach((o) => {
          o.update(data);
        });
      }
    }
  }

  public removeObserver(observer: IObserver<T>, event: EventType): void {
    const eventObservers = this.observers.get(event);

    if (eventObservers) {
      eventObservers.delete(observer);
    }
  }

  private observers: Map<EventType, Set<IObserver<T>>> = new Map();
}
