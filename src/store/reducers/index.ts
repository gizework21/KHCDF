import { combineReducers } from "@reduxjs/toolkit";
import members from "../../app/pages/Admin/Register/slice";
import user from "../../app/pages/Shared/Home/slice";
import userInfoReducer from "../../app/api/slice";
import Groups from "../../app/pages/Admin/Groups/slice";
import updatePasswordReducer from "../../app/components/Profile/slice";


const rootReducer = combineReducers({
  // Add Reducers here
  user: user,
  userInfo: userInfoReducer,
  updatePassword: updatePasswordReducer,
  member: members,
  groups: Groups,
});

export default rootReducer;
