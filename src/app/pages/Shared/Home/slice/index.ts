/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { IUserLogin, IUserLoginState } from "./types";
import { loginUser } from "../../../../api";

const initialState: IUserLoginState = {
  loading: false,
  error: null,
  token: null,
  user: null,
};

// Log in User Thunk
export const userLoginThunk =
  (loginData: IUserLogin) => async (dispatch: Dispatch) => {
    dispatch(loginUserRequest());
    try {
      const userInfo = await loginUser(loginData);
      dispatch(loginUserSuccess(userInfo));
    } catch (error: any) {
      dispatch(
        loginUserFailure(error.response?.data?.message || error.message)
      );

      throw error.response?.data?.message || error.message;
    }
  };

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    loginUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginUserRequest, loginUserSuccess, loginUserFailure } =
  user.actions;

export default user.reducer;
