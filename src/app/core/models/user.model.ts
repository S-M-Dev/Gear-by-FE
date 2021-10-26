export interface User {
  id: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  cash: number;
  address: string;
  role: UserRole;
}

export enum UserRole {
  User = 'ROLE_USER',
  Admin = 'ROLE_ADMIN',
}
