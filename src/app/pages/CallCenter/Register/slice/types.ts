/* eslint-disable @typescript-eslint/no-explicit-any */
export interface NewMember {
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  address?: string;
  housingLocation?: string;
  category?: string;
  subCategory?: string;
  additionalInfo?: string;
}

export interface IMemberRegisterState {
  newMember: NewMember;
  loading: boolean;
  error: any;
}
