/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { Group, IAllGroupsState } from "./types";
import { fetchAllGroups, fetchSingleGroup } from "../../../../api";

const initialState: IAllGroupsState = {
  loading: false,
  error: null,
  allGroups: [],
  singleGroup: {} as Group,
};

// fetch all Groups
export const fetchingAllGroupsThunk = () => async (dispatch: Dispatch) => {
  try {
    const AllGroups = await fetchAllGroups();

    dispatch(fetchAllGroupsSuccess(AllGroups));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    dispatch(fetchAllGroupsFailure(error.response.data.message));
    throw error.response.data.message;
  }
};

// fetch single Group
export const fetchingSingleGroup =
  (id: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(fetchSingleGroupRequest());

      const singleUser = await fetchSingleGroup(id);

      dispatch(fetchSingleGroupSuccess(singleUser));
    } catch (error: any) {
      dispatch(fetchSingleGroupFailure(error.response.data.message));
      throw error.response.data.message;
    }
  };

const Groups = createSlice({
  name: "Groups",
  initialState,
  reducers: {
    // Fetch All Groups
    fetchAllGroupsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllGroupsSuccess(state, action) {
      state.loading = false;
      state.allGroups = action.payload;
      state.error = null;
    },
    fetchAllGroupsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // For Single Group
    fetchSingleGroupRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSingleGroupSuccess(state, action) {
      state.loading = false;
      state.singleGroup = action.payload;
      state.error = null;
    },
    fetchSingleGroupFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAllGroupsRequest,
  fetchAllGroupsSuccess,
  fetchAllGroupsFailure,
  fetchSingleGroupRequest,
  fetchSingleGroupSuccess,
  fetchSingleGroupFailure,
} = Groups.actions;

export default Groups.reducer;
