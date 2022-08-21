import axios, { AxiosResponse } from 'axios';
interface userProps {
  id: number;
  name: string;
  age: number;
}
// how to declare a callback as function
type Callback = () => void;

// start of class User
export class User {
  // declare an obj without knowing what key it will have
  events: { [key: string]: Callback[] } = {};
  constructor(private data: userProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }
  set(update: userProps): void {
    Object.assign(this.data, update);
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
  fetch(): void {
    axios
      .get(`http://localhost:3000/users/${this.get('id')}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      });
  }

  save(): void {
    const id = this.get('id');
    if (id) {
      axios.put(`http://localhost:3000/users/${id}`, this.data);
    } else {
      //  post
      axios.post('http://localhost:3000/users', this.data);
    }
  }
}
