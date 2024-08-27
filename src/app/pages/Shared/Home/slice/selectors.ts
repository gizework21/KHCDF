import { RootState } from "../../../../../store/store";

// Selectors
export const selectLoginLoading = (state: RootState) => state.user.loading;

export const selectLoginError = (state: RootState) => state.user.error;

export const selectLoginUser = (state: RootState) => state.user.user;

export const selectLoginUserToken = (state: RootState) => state.user.token;
