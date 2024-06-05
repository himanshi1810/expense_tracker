import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expense: localStorage.getItem("expense") ? JSON.parse(localStorage.getItem("expense")) : null,
  loading: false,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialState,
  reducers: {
    setExpense: (state, action) => {
      state.expense = action.payload;
      localStorage.setItem("expense", JSON.stringify(action.payload));
    },
    updateExpense: (state, action) => {
      state.expense = action.payload;
      localStorage.setItem("expense", JSON.stringify(action.payload));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export const { setExpense, updateExpense, setLoading } = expenseSlice.actions;
export default expenseSlice.reducer;
