import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    group: localStorage.getItem("expenseGroup") ? JSON.parse(localStorage.getItem("expenseGroup")) : null,
    loading: false,
    groupId : null
};

const groupSlice = createSlice({
    name: "group",
    initialState: initialState,
    reducers: {
        setGroup: (state, action) => {
            state.group = action.payload;
        },

        setUpdatedGroup: (state, action) => {
            state.group = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setGroupId : (state, action) => {
            state.groupId = action.payload
            console.log("Group Id in slice", state.groupId);
        }
    },
});

export const { setGroup, setUpdatedGroup, setLoading, setGroupId } = groupSlice.actions;
export default groupSlice.reducer;
