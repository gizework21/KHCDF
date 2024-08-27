import { RootState } from "../../../../../store/store";

// Selectors
export const selectAllGroups = (state: RootState) => state.groups.allGroups;

export const selectSingleGroup = (state: RootState) => state.groups.singleGroup;
