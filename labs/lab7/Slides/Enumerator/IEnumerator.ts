import IEnumerable from "./IEnumerable";

interface IEnumerator {
  reset(): void;
  hasNext(): boolean;
  next(): IEnumerable;
}

export default IEnumerator;
