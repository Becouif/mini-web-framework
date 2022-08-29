import { User } from './../models/User';
export class UserForm {
  constructor(public parent: Element, public model: User) {}

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onButtonClick,
    };
  }

  onButtonClick = (): void => {
    this.model.setRandomAge();
  };

  template(): string {
    return `
    <div>
    <h1>User Form</h1>
    <div>Username:${this.model.get('name')} </div>
    <div>Age:${this.model.get('age')} </div>
    <input />
    <button>Click Me!!!</button>
    <button class="set-age">Set random age</button>
    </div>
    `;
  }
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');
      fragment.querySelectorAll('.set-age').forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  render(): void {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
