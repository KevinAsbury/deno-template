import UserInterface from '../interfaces/User.ts';
import UserModel from '../models/user.ts';
import { bcrypt } from '../../deps.ts';

class User implements UserInterface {
  email = '';
  id = crypto.randomUUID();
  confirmed = false;
  active = true;
  createdAt = Date.now();
  updatedAt = Date.now();
  password = '';
  passwordConfirmation = undefined;
  passwordDigest = undefined;

  constructor(email: string = '') {
    this.email = email;
  }

  all = async () => {
    return await UserModel.all();
  };

  save = async () => {
    return await UserModel.save(this);
  };

  create = async () => {
    if (this.id) return;
    if (!this.email) return;
    return await UserModel.create(this);
  };

  destroy = async () => {
    return await UserModel.destroy(this);
  };

  findByEmail = async () => {
    return await UserModel.findByEmail(this);
  };

  findById = async () => {
    return await UserModel.findById(this);
  };

  activate = async () => {
    return await UserModel.activate(this);
  };

  deactivate = async () => {
    return await UserModel.deactivate(this);
  };

  confirm = async () => {
    return await UserModel.confirm(this);
  };

  changePassword = async () => {
    return await UserModel.changePassword(this);
  };

  isActive = async () => {
    return await UserModel.isActive(this);
  };

  isConfirmed = async () => {
    return await UserModel.isConfirmed(this);
  };

  passwordValid = () => {
    if (!this.password) return false;
    const specChars = ['!', '@', '#', '$', '%', '^', '&', '*', '?', '_'];
    const passwordArr = this.password.split('');
    const minLength = 8;

    const longEnough = passwordArr.length >= minLength;
    if (!longEnough) {
      this.errorHandler(
        `Password not long enough Must be at least ${minLength} characters!`
      );
      return false;
    }

    const containsSpecChar = specChars.some(c => this.password.includes(c));
    if (!containsSpecChar) {
      this.errorHandler('Password needs at least one special character!');
      return false;
    }

    const containsUpperCase = passwordArr.some(c => c.toUpperCase() === c);
    if (!containsUpperCase) {
      this.errorHandler('Password needs at least one uppercase character!');
      return false;
    }

    const containsLowerCase = passwordArr.some(c => c.toLowerCase() === c);
    if (!containsLowerCase) {
      this.errorHandler('Password needs at least one lowercase character!');
      return false;
    }

    return this.password === this.passwordConfirmation;
  };

  emailValid = () => {
    if (!this.email) return false;
    this.email = this.email.trim();
    const abnormalChars = ` !#$%^&*?,~()<>/'\\";:{}[]\`|`.split('');
    const emailArr = this.email.split('');
    const minLength = 6;

    const longEnough = emailArr.length >= minLength;
    if (!longEnough) {
      this.errorHandler(
        `Email not long enough Must be at least ${minLength} characters!`
      );
      return false;
    }

    const containsAt = this.email.includes('@');
    if (!containsAt) {
      this.errorHandler(`Email must contain @ symbol!`);
      return false;
    }

    const containsDot = this.email.includes('.');
    if (!containsDot) {
      this.errorHandler(`Email must contain . symbol!`);
      return false;
    }

    const containsAbnormalChar = abnormalChars.some(c =>
      this.email.includes(c)
    );
    if (containsAbnormalChar) {
      this.errorHandler('Email must not contain abnormal chacter(s)!');
      return false;
    }

    const containsSpaces = this.email.includes(' ');
    if (containsSpaces) {
      this.errorHandler('Email must not contain spaces!');
      return false;
    }

    return true;
  };

  hash = async () => {
    if (!this.passwordValid || !this.emailValid) return;
    const salt = await bcrypt.genSalt(10);
    this.passwordDigest = await bcrypt.hash(this.password, salt);
    this.password = '';
    this.passwordConfirmation = undefined;
  };

  errorHandler = (message: string) => {
    alert(message);
    console.error(message);
  };
}

export default User;
