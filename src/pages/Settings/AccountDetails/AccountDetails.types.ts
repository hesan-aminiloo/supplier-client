export type fieldNames =
  | 'avatar'
  | 'firstName'
  | 'lastName'
  | 'username'
  | 'phone'
  | 'email'
  | 'branch'
  | 'currentPassword'
  | 'password'
  | 'role'
  | 'password_confirmation';

export type SubmitDataType = {
  avatar: File | string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  email: string;
  branch: string;
  role: string;
  currentPassword: string;
  password: string;
  password_confirmation: string;
};
