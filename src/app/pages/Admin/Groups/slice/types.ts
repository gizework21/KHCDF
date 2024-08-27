export interface Member {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  housingLocation: string;
  category: string;
  __v: number;
}

export interface Group {
  _id: string;
  category: string;
  housingLocation: string;
  members: Member[];
  groupName: string;
}

export interface IAllGroupsState {
  loading: boolean;
  error: string | null;
  allGroups: Group[];
  singleGroup: Group;
}
