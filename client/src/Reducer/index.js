import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import profileSlice from "./Slices/profileSlice";
import expenseSlice from "./Slices/expenseSlice";
import groupSlice from "./Slices/groupSlice";
import sidebarSlice from "./Slices/sidebarSlice";

const rootReducer= combineReducers(
    {
        auth : authSlice,
        profile : profileSlice,
        expense : expenseSlice,
        group : groupSlice,
        sidebar : sidebarSlice
    }
)
export default rootReducer;