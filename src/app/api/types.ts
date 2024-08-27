export interface IRegisterMember {
  _id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  address?: string;
  housingLocation?: string;
  category?: string;
  subCategory?: string;
  additionalInfo?: string;
  role?: string;
}

export interface ILoginProps {
  phoneNumber: string;
  password: string;
}
