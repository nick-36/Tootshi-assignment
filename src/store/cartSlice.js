import { createSlice } from "@reduxjs/toolkit";
import { calculateTotal } from "../utils/helpers";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],

    isEmpty: true,
    quantity: null,
    total: null,
  },
  reducers: {
    ADD_CART_ITEM: (state, action) => {
      const { product, quantity } = action.payload;

      const itemIndex = state.products.findIndex((item) => {
        return item.id === product.id;
      });

      if (itemIndex >= 0) {
        state.products[itemIndex].quantity += quantity;
      } else {
        let newProduct = {
          ...product,
          quantity,
          subTotal: product.price * quantity,
        };

        state.products = [...state.products, newProduct];
      }

      state.quantity = state.products.length;
      // state.total = calculateTotal(state.products);
      state.isEmpty = false;
    },
    DELETE_CART_ITEM: (state, action) => {
      state.products = state.products.filter((product) => {
        return product.id !== action.payload.id;
      });
      state.quantity = state.products.length;
      // state.total = calculateTotal(state.products);

      if (state.products.length === 0) {
        state.isEmpty = true;
      } else {
        state.isEmpty = false;
      }
    },
    INCREASE_QTY: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    DECREASE_QTY: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },

    UPDATE_QUANTITY: (state, action) => {
      const { id, quantity } = action.payload;

      let itemIndex = state.products.findIndex((item) => {
        return item.id === id;
      });
      if (itemIndex >= 0) {
        let currProduct = state.products[itemIndex];

        currProduct.quantity = quantity;

        currProduct.subTotal = currProduct.quantity * currProduct.price;
      }
    },
    GET_TOTAL: (state) => {
      const { total, quantity } = state.products.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const newSubTotal = price * quantity;
          cartItem.subTotal = newSubTotal;
          cartTotal.total += newSubTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );

      state.quantity = quantity;
      state.total = total;
    },
  },
});

const { reducer, actions } = cartSlice;

export const {
  ADD_CART_ITEM,
  DELETE_CART_ITEM,
  UPDATE_QUANTITY,
  INCREASE_QTY,
  DECREASE_QTY,
  GET_TOTAL,
} = actions;
export default reducer;
