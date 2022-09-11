import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isEmpty: false,
  },
  reducers: {
    SET_PRODUCTS: (state, action) => {
      state.products = action.payload;
      if (state.products.length === 0) {
        state.isEmpty = true;
      } else {
        state.isEmpty = false;
      }
    },
  },
});

const { reducer, actions } = productsSlice;

export const { SET_PRODUCTS } = actions;
export default reducer;
