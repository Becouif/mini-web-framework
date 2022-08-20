interface userProps {
  id: number;
  name: string;
  age: number;
}
// how to declare a callback as function
type Callback = () => void;
export class User {
  // declare an obj without knowing what key it will have
  events: { [key: string]: Callback[] } = {};
  constructor(private data: userProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  // this on method means we are going to call on with string as first argument and function as second argument
  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }
  trigger(eventName: string): void {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) {
      return;
    }
    handlers.forEach((callback) => {
      callback();
    });
  }
  fetch(): void {}
}
