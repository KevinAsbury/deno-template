import UserInterface from '../interfaces/User.ts';

class User implements UserInterface {
  email = '';
  id = crypto.randomUUID();
  confirmed = false;
  active = true;
  createdAt = Date.now();
  updatedAt = Date.now();

  constructor(email: string = '') {
    this.email = email;
  }
}

export default User;
