import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    orderList:[],
    orderDetails:null
}
const host = import.meta.env.VITE_BACKEND_URI

  export const getAllOrder = createAsyncThunk('/order/getAllOrder',async()=>{
    const response = await axios.get(`${host}/api/admin/orders/get`)
    return response.data
  })

  export const getOrderDetails = createAsyncThunk('/order/getOrderDetails',async(id)=>{
    const response = await axios.get(`${host}/api/admin/orders/details/${id}`)
    return response.data
  })

  export const updateOrderStatus = createAsyncThunk(
    "/order/updateOrderStatus",
    async ({ id, orderStatus }) => {
      const response = await axios.put(
        `${host}/api/admin/orders/update/${id}`,
        {
          orderStatus,
        }
      );
  
      return response.data;
    }
  );
const adminOrderSlice = createSlice({
    name: 'adminOrderSlice',
    initialState,
    reducers:{
        resetOrderDetails:(state,action)=>{
            state.orderDetails = null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllOrder.pending,(state)=>{
            state.isLoading = true
        }).addCase(getAllOrder.fulfilled,(state,action)=>{
            state.isLoading = false
            state.orderList = action.payload.data
        }).addCase(getAllOrder.rejected,(state)=>{
            state.isLoading = false
            state.orderList = []
        }).addCase(getOrderDetails.pending,(state)=>{
            state.isLoading = true
        }).addCase(getOrderDetails.fulfilled,(state,action)=>{
            state.isLoading = false
            state.orderDetails = action.payload.data
        }).addCase(getOrderDetails.rejected,(state)=>{
            state.isLoading = false
            state.orderDetails = null
        })
    }
})
export const { resetOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;