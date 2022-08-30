import { View } from './views';
import { User, UserProps } from '../models/User';
export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSetUserModel,
    };
  }
  onSetUserModel = (): void => {
    this.model.save();
  };
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };
  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');
    const name = input!.value;
    this.model.set({ name });
  };

  template(): string {
    return `
    <div>
    <input placeholder="${this.model.get('name')}" />
    <button class="set-name">Change Name</button>
    <button class="set-age">Set random age</button>
    <button class="save-model">Save User</button>
    </div>
    `;
  }
}
