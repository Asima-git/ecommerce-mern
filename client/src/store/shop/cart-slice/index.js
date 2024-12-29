import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartItem : [],
    isLoading : false
}
const host = import.meta.env.VITE_BACKEND_URI

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, qty }) => {
    const response = await axios.post(
      `${host}/api/shop/cart/add`,
      { userId, productId, qty },
      { withCredentials: true }
    );
    return response.data; 
  }
);

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (userId) => {
    const response = await axios.get(
      `${host}/api/shop/cart/get/${userId}`,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const deleteCart = createAsyncThunk(
  'cart/deleteCart',
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${host}/api/shop/cart/delete-cart/${userId}/${productId}`,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const updateCartQty = createAsyncThunk(
  'cart/updateCartQty',
  async ({ userId, productId, qty }) => {
    const response = await axios.put(
      `${host}/api/shop/cart/update-cart`,
      { userId, productId, qty },
      { withCredentials: true }
    );
    return response.data;
  }
);

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItem = action.payload; // Directly use payload
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItem = [];
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItem = action.payload;
      })
      .addCase(getCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItem = [];
      })
      .addCase(updateCartQty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItem = action.payload;
      })
      .addCase(updateCartQty.rejected, (state) => {
        state.isLoading = false;
        state.cartItem = [];
      })
      .addCase(deleteCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItem = action.payload;
      })
      .addCase(deleteCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItem = [];
      });
  },
});

export default shoppingCartSlice.reducer;