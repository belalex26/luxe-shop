import {createSlice} from "@reduxjs/toolkit";
import dressData from "../data/mockDress.js";

export const dressSlise = createSlice({
  name: `dress`,
  initialState: {
    dress: dressData
  },
  reducers: {

  },
});

export const {} = dressSlise.actions;
export const selectDress = (state) => state.dress.dress;
export default dressSlise.reducer;
