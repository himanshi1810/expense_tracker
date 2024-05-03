import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    group: localStorage.getItem("group") ? JSON.parse(localStorage.getItem("group")) : null,
    loading: false,
};

const groupSlice = createSlice({
    name: "group",
    initialState: initialState,
    reducers: {
        setGroup: (state, action) => {
            state.group = action.payload;
        },
        // Rename the updateGroup action to avoid conflict
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
