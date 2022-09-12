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
//
// export const initializeApp = createAsyncThunk(
//     "auth/me",
//     async (_, thunkAPI) => {
//         try {
//             const response = await authAPI.me()
//             console.log(response.data)
//             return response.data
//         } catch (e) {
//             console.log("Error", e)
//             return thunkAPI.rejectWithValue(e)
//         }
//     }
// )

const initialState = {
    notErrorlogin:true,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    notErrorlogin(state, action: PayloadAction<boolean>) {
            state.notErrorlogin= action.payload
        },
    },
    extraReducers: (builder) => {
        builder
    .addCase(loginUser.fulfilled, (state) => {
                state.isLoggedIn = true
                state.notErrorlogin=true
            })
     }})
export const {notErrorlogin} = authSlice.actions

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
