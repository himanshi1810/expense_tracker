import {createSlice} from "@reduxjs/toolkit"
import { updateGroup } from "../Services/operations/group";

const initialState = {
    group: localStorage.getItem("group") ? JSON.parse(localStorage.getItem("group")) : null,
    loading: false,
};

const groupSlice = createSlice({
    name:"group",
    initialState: initialState,
    reducers: {
        setGroup : (state, action) => {
            state.group = action.payload
        },
        updateGroup : (state, action) => {
            state.group = action.group
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    },
});

export const {setGroup, updateGroup, setLoading} = groupSlice.actions;
export default groupSlice.reducer;