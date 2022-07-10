export default interface User {
  id?: string;
  email: string;
  password?: string | null;
  passwordConfirmation?: string | null;
  passwordDigest?: string;
  confirmed?: boolean;
  active?: boolean;
  createdAt?: Date | number | string;
  updatedAt?: Date | number | string;
}
