import {createSlice} from "@reduxjs/toolkit";

export const filtersSlise = createSlice({
  name: `filter`,
  initialState: {
    sort: {},
    filter: {}
  },
  reducers: {
    changeSort: (state, action) => {
      state.sort = {...action.payload};
    },

    changeFilter: (state, action) => {
      state.filter = {...action.payload};
    },
  },
});

export const {changeFilter, changeSort} = filtersSlise.actions;
export const selectFilter = (state) => state.filter.filter;
export const selectSort = (state) => state.filter.sort;

export default filtersSlise.reducer;
