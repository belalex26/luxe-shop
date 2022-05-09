import {createSlice} from "@reduxjs/toolkit";

export const cardSlise = createSlice({
  name: `card`,
  initialState: {
    value: {}
  },
  reducers: {
    addToCart: (state, data) => {
      let artucul = data.payload;
      if (state.value[artucul] === undefined) {
        state.value[artucul] = 0;
      } state.value[artucul]++;
    },

    deleteToCard: (state, action) => {
      state.value = {...action.payload};
    },

    updateToCard: (state, action) => {
      state.value = {...action.payload};
    },

  },
});

export const {addToCart, deleteToCard, updateToCard} = cardSlise.actions;
export const selectCard = (state) => state.card.value;


export default cardSlise.reducer;
