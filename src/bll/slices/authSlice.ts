import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../../api/notes-api";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (params: RegisterParamsType, thunkAPI) => {
        try {
            const response = await authAPI.register(params.email, params.password, params.country)
            return response.data.message
        } catch (e) {
            console.log("Error", e)
            return thunkAPI.rejectWithValue(e)
        }
    }
 )

const initialState = {
    loginError:false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    isThereErrorOnLogin(state, action: PayloadAction<boolean>) {
            state.loginError= action.payload
        },
    },
    extraReducers: (builder) => {
        builder
    // .addCase(loginUser.fulfilled, (state) => {
    //             state.isLoggedIn = true
    //             state.loginError=false
    //         })
     }})
export const {isThereErrorOnLogin} = authSlice.actions

export default authSlice.reducer

// Types for thunk

export type LoginParamsType = {
    email: string
    password: string
}
export type RegisterParamsType = {
    email: string
    password: string
    country: string
    username: string
}
