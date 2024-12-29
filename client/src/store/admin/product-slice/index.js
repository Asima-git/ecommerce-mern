import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : true,
    products : []
}
const host = import.meta.env.VITE_BACKEND_URI

export const addNewProduct = createAsyncThunk('/product/add-product',
    async(formData)=>{
        const response = await axios.post(`${host}/api/admin/products/add-product`,formData,{
            header : {
             'Content-Type':"application/json"
            },
            withCredentials:true
        })
        return response?.data
    });

export const fetchProduct = createAsyncThunk('/product/get-product',
        async()=>{
            const response = await axios.get(`${host}/api/admin/products/get-product`,{
                withCredentials:true
            })
            return response?.data
        })

export const editProduct = createAsyncThunk('/product/edit-product',async({id,formData})=>{
    const response = await axios.put(`${host}/api/admin/products/update-product/${id}`,formData,{
        header : {
            'Content-Type':"application/json"
           },
           withCredentials:true
    })
    return response?.data
  })
  
  export const deleteProduct = createAsyncThunk('/product/delete-product',async(id)=>{
    const response = await axios.delete(`${host}/api/admin/products/delete-product/${id}`,{
           withCredentials:true
    })
    return response?.data
  })


const adminProductSlice = createSlice({
    name : 'adminProducts',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchProduct.pending,(state)=>{
            state.isLoading = true
        }).addCase(fetchProduct.fulfilled,(state,action)=>{
            state.isLoading = false
            state.productList = action.payload.data
        }).addCase(fetchProduct.rejected,(state,action)=>{
            state.isLoading = false
            state.productList = []
        })
    }
})

export default adminProductSlice.reducer