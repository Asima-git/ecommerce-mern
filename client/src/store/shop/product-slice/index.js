import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isLoading :false,
    productList : [],
    productDetailsListOne:null
}
const host = import.meta.env.VITE_BACKEND_URI

export const fetchProduct = createAsyncThunk('/product/shop-product',
    async({filterParams,sortParams})=>{
        const query = new URLSearchParams({
            ...filterParams,sortBy:sortParams
        })
        const response = await axios.get(`${host}/api/shop/products/get?${query}`,{
            withCredentials:true
        })
        return response?.data
    })

    export const getProductDetails = createAsyncThunk('/product/shop-product-details',
        async(id)=>{
            const response = await axios.get(`${host}/api/shop/products/get/${id}`,{
                withCredentials:true
            })
            return response?.data
        })
const shopProductSlice = createSlice({
    name:'shopping-products',
    initialState,
    reducer:{
        setProductDetails:(state)=>{
            state.productDetailsListOne = null
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(fetchProduct.pending,(state,action)=>{
            state.isLoading = true
        }).addCase(fetchProduct.fulfilled,(state,action)=>{
            state.isLoading = false
            state.productList = action.payload.data
        }).addCase(fetchProduct.rejected,(state,action)=>{
            state.isLoading = false
            state.productList = []
        }).addCase(getProductDetails.pending,(state,action)=>{
            state.isLoading = true
        }).addCase(getProductDetails.fulfilled,(state,action)=>{
            state.isLoading = false
            state.productDetailsListOne = action.payload.data
        }).addCase(getProductDetails.rejected,(state,action)=>{
            state.isLoading = false
            state.productDetailsListOne = null
        })
    }
})
export const { setProductDetails } = shopProductSlice.actions;

export default shopProductSlice.reducer