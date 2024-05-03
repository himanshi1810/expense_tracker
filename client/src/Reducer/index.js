import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import profileSlice from "./Slices/profileSlice";
import expenseSlice from "./Slices/expenseSlice";
import groupSlice from "./Slices/groupSlice";

const rootReducer= combineReducers(
    {
        auth : authSlice,
        profile : profileSlice,
        expense : expenseSlice,
        group : groupSlice
    }
)
export default rootReducer;