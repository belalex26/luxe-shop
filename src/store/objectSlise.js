import {createSlice} from "@reduxjs/toolkit";

export const objectSlise = createSlice({
  name: `object`,
  initialState: {
    value: {},
  },
  reducers: {
    dataObject: (state, action) => {
      state.value = {...action.payload};
    },
  },
});

export const {dataObject} = objectSlise.actions;
export const selectObject = (state) => state.object.value;
export default objectSlise.reducer;
