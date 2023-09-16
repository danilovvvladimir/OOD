/*
	Шаблонный интерфейс IObserver. Его должен реализовывать класс, 
	желающий получать уведомления от соответствующего IObservable
	Параметром шаблона является тип аргумента,
	передаваемого Наблюдателю в метод Update
*/

import { IObservable } from "../observable/observable";

export interface IObserver<T> {
  update(data: T, observable: IObservable<T>): void;
}
