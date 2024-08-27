import { RootState } from "../../../store/store";

export const selectUser = (state: RootState) => state.user.user;

export const selectUserRole = (state: RootState) => state.user?.user?.role;
