<<<<<<< Updated upstream
import { createSlice } from "@reduxjs/toolkit";
=======
import {createSlice} from "@reduxjs/toolkit"
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        // Rename the updateGroup action to avoid conflict
        setUpdatedGroup: (state, action) => {
            state.group = action.payload;
=======
        editGroup : (state, action) => {
            state.group = action.group
>>>>>>> Stashed changes
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
});

<<<<<<< Updated upstream
export const { setGroup, setUpdatedGroup, setLoading } = groupSlice.actions;
export default groupSlice.reducer;
=======
export const {setGroup, editGroup, setLoading} = groupSlice.actions;
export default groupSlice.reducer;
>>>>>>> Stashed changes
