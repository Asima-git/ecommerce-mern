import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isLoading :false,
    searchResults: [],
}
const host = import.meta.env.VITE_BACKEND_URI

export const getSearchResults = createAsyncThunk('/search/getSearchResults',
    async(keyword)=>{
        const response = await axios.get(`${host}/api/shop/search/${keyword}`,{
            withCredentials:true
        })
        return response?.data
    })

    
const searchSlice = createSlice({
    name:'searchSlice',
    initialState,
    reducer:{
        resetSearchResults: (state) => {
            state.searchResults = [];
          },
    },
    extraReducers:(builder) =>{
        builder.addCase(getSearchResults.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getSearchResults.fulfilled, (state, action) => {
            state.isLoading = false;
            state.searchResults = action.payload.data;
          })
          .addCase(getSearchResults.rejected, (state) => {
            state.isLoading = false;
            state.searchResults = [];
          });
    }
})
export const { resetSearchResults } = searchSlice.actions;

export default searchSlice.reducer