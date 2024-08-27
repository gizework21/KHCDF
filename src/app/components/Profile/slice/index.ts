/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../store/store";
import { updateUserPassword } from "../../../api";

interface UpdatePasswordState {
  loading: boolean;
  error: string | null;
}

const initialState: UpdatePasswordState = {
  loading: false,
  error: null,
};

export const updatePasswordThunk =
  (currentPassword: string, newPassword: string, id: string) =>
  async (dispatch: any) => {
    try {
      dispatch(updatePasswordRequest());
      await updateUserPassword(currentPassword, newPassword, id);
      dispatch(updatePasswordSuccess());
    } catch (error: any) {
      dispatch(updatePasswordFailure(error.response.data.message));
      throw error.response.data.message;
    }
  };

const updatePasswordSlice = createSlice({
  name: "updatePassword",
  initialState,
  reducers: {
    updatePasswordRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updatePasswordSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    updatePasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailure,
} = updatePasswordSlice.actions;

export const selectUpdatePasswordLoading = (state: RootState) =>
  state.updatePassword.loading;

export const selectUpdatePasswordError = (state: RootState) =>
  state.updatePassword.error;

export default updatePasswordSlice.reducer;
