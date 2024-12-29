import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    addressList : [],
    isLoading : false
}
const host = import.meta.env.VITE_BACKEND_URI

export const addNewAddress = createAsyncThunk(
  'address/addNewAddress',
  async (formData) => {
    const response = await axios.post(
      `${host}/api/shop/address/add`,
      formData,
      { withCredentials: true }
    );
    return response.data; 
  }
);

export const getAllAddress= createAsyncThunk(
  'address/getAllAddress',
  async (userId) => {
    const response = await axios.get(
      `${host}/api/shop/address/get/${userId}`,
      { withCredentials: true }
    );
    return response.data;
  }
);2

export const deleteAddress = createAsyncThunk(
  'address/deleteAddress',
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `${host}/api/shop/address/delete/${userId}/${addressId}`,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const updateAddress = createAsyncThunk(
  'address/updateAddress',
  async ({userId,addressId,formData}) => {
    const response = await axios.put(
      `${host}/api/shop/address/update/${userId}/${addressId}`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

const shoppingAddressSlice = createSlice({
  name: 'shoppingAddress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.addressList = action.payload.data; 
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
        // state.addressList = [];
      })
      .addCase(getAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(getAllAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(updateAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default shoppingAddressSlice.reducer;