/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { IMemberRegisterState, NewMember } from "./types";
import { registerNewMember } from "../../../../api";

const initialState: IMemberRegisterState = {
  newMember: {} as NewMember,
  loading: false,
  error: null,
};

// Thunk action creator for registering a new Member
export const registerMemberThunk =
  (memberData: NewMember) => async (dispatch: Dispatch) => {
    try {
      const newMember = await registerNewMember(memberData);
      dispatch(registerNewMemberSuccess(newMember.member));

      return newMember;
    } catch (error: any) {
      dispatch(registerNewMemberFailure(error.response.data.message));
      throw error.response.data.message;
    }
  };

// // fetch all Members
// export const fetchingAllMembersThunk = () => async (dispatch: Dispatch) => {
//   try {
//     const AllMembers = await getAllEmployees();
//     dispatch(requestFetchMemberSuccess(AllMembers));
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     dispatch(requestFetchMemberFailure(error.response.data.message));
//     throw error.response.data.message;
//   }
// };

// // fetch single Members
// export const fetchingSingleMemberThunk =
//   (memberId: string) => async (dispatch: Dispatch) => {
//     try {
//       dispatch(requestFetchSingleMemberRequest());

//       const singleMember = await getSingleMember(memberId);

//       dispatch(requestSingleFetchMemberSuccess(singleMember));
//     } catch (error: any) {
//       dispatch(requestSingleFetchMemberFailure(error.response.data.message));
//       throw error.response.data.message;
//     }
//   };

const registerMember = createSlice({
  name: "registerMember",
  initialState,
  reducers: {
    registerNewMemberRequest(state) {
      state.loading = true;
      state.error = null;
    },
    registerNewMemberSuccess(state, action) {
      state.loading = false;
      state.newMember = action.payload;
      state.error = null;
    },
    registerNewMemberFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // // for all members
    // requestFetchMemberRequest(state) {
    //   state.loading = true;
    //   state.error = null;
    // },
    // requestFetchMemberSuccess(state, action) {
    //   state.loading = false;
    //   state.allMembers = action.payload;
    //   state.error = null;
    // },
    // requestFetchMemberFailure(state, action) {
    //   state.loading = false;
    //   state.error = action.payload;
    // },

    // // for single member

    // requestFetchSingleMemberRequest(state) {
    //   state.loading = true;
    //   state.error = null;
    // },
    // requestSingleFetchMemberSuccess(state, action) {
    //   state.loading = false;
    //   state.singleMember = action.payload;
    //   state.error = null;
    // },
    // requestSingleFetchMemberFailure(state, action) {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
  },
});

export const {
  registerNewMemberRequest,
  registerNewMemberSuccess,
  registerNewMemberFailure,
  //   requestFetchMemberRequest,
  //   requestFetchMemberSuccess,
  //   requestFetchMemberFailure,
  //   requestFetchSingleMemberRequest,
  //   requestSingleFetchMemberSuccess,
  //   requestSingleFetchMemberFailure,
} = registerMember.actions;

export default registerMember.reducer;
