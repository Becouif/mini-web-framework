import { User } from './models/User';

const user = new User({ id: 3, name: 'james', age: 50 });
user.save();
