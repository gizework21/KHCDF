export interface IUser {
  _id: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// Interface for user login input
export interface IUserLogin {
  phoneNumber: string;
  password: string;
}

// Interface for user login state
export interface IUserLoginState {
  loading: boolean;
  error: string | null;
  token: string | null;
  user: IUser | null;
}
