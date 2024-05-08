import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    group: localStorage.getItem("expenseGroup") ? JSON.parse(localStorage.getItem("expenseGroup")) : null,
    loading: false,
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
        }
    },
});

export const { setGroup, setUpdatedGroup, setLoading } = groupSlice.actions;
export default groupSlice.reducer;
