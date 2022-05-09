import {createSlice} from "@reduxjs/toolkit";


export const paginationSlise = createSlice({
  name: `pagination`,
  initialState: {
    pageNumber: 0,
  },
  reducers: {
    selectPage: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
});

export const {selectPage} = paginationSlise.actions;
export const selectPagination = (state) => state.pagination.pageNumber;
export default paginationSlise.reducer;
