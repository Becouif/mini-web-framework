import { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'https://localhost:300/users';
// start of class User
export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }
  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }
  get get() {
    return this.attributes.get;
  }
  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.attributes.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  // declare an obj without knowing what key it will have
  // constructor(private data: UserProps) {}

  // get(propName: string): string | number {
  //   return this.data[propName];
  // }
  // set(update: UserProps): void {
  //   Object.assign(this.data, update);
  // }

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
