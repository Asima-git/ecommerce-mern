import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated : false,
    isLoading : true,
    user : null
}
const host = import.meta.env.VITE_BACKEND_URI

export const registerUser = createAsyncThunk('/auth/register',
    async(formData)=>{
        const response = await axios.post(`${host}/api/auth/register`,formData,{
            withCredentials:true
        })
        return response.data
    })

export const loginUser = createAsyncThunk('/auth/login',
        async(formData)=>{
            const response = await axios.post(`${host}/api/auth/login`,formData,{
                withCredentials:true
            })
            return response.data
        })
        
export const logoutUser = createAsyncThunk('/auth/logout',
            async()=>{
                const response = await axios.post(`${host}/api/auth/logout`,{},{
                    withCredentials:true
                })
                return response.data
 })
export const checkAuth = createAsyncThunk('/auth/check-auth',
            async()=>{
                const response = await axios.get(`${host}/api/auth/check-auth`,{
                    withCredentials:true,
                    'Cache-Control':'no-store,no-cache,must-revalidate,proxy-revalidate'
                })
                return response.data
            })
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state,action)=>{
           
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading = true
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = false
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = false
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success;
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
          }).addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success;
          })
          .addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
          })
          .addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
          })
    }
});

export const {setUser} = authSlice.actions;
export default authSlice.reducer;