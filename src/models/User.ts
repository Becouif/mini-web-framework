import { Eventing } from './Eventing';
import { Sync } from './Sync';
export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}
// how to declare a callback as function

const rootUrl = 'https://localhost:300/users';
// start of class User
export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);

  // declare an obj without knowing what key it will have
  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }
  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  // this on method means we are going to call on with string as first argument and function as second argument

  // change to composition
  //  *****
  // on(eventName: string, callback: Callback): void {
  //   const handlers = this.events[eventName] || [];
  //   handlers.push(callback);
  //   this.events[eventName] = handlers;
  // }
  // trigger(eventName: string): void {
  //   const handlers = this.events[eventName];
  //   if (!handlers || handlers.length === 0) {
  //     return;
  //   }
  //   handlers.forEach((callback) => {
  //     callback();
  //   });
  // }
}
