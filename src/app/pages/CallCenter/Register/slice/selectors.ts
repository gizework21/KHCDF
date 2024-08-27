import { RootState } from "../../../../../store/store";

// Selectors
export const selectRegisterLoading = (state: RootState) =>
  state.member.loading;

export const selectRegisterError = (state: RootState) =>
  state.member.error;

export const selectRegisterMember = (state: RootState) =>
  state.member.newMember;

// export const selectAllMembers = (state: RootState) => state.member.allMembers;

// export const selectSingleMember = (state: RootState) =>
//   state.member.singleMember;
