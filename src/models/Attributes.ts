// using generic on class and on the class method get
export class Attributes<T> {
  constructor(private data: T) {}
  // using generic on method to constrict to type of its generic classs
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };
  set(update: T): void {
    Object.assign(this.data, update);
  }
}
