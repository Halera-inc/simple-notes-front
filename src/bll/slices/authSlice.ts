import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NullableType} from "../store";
import {authAPI} from "../../api/notes-api";
import {router} from "next/client";

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
export const loginUser = createAsyncThunk(
    "auth/login",
    async (params: LoginParamsType, thunkAPI) => {
        try {
            const response = await authAPI.login(params.email, params.password)
            localStorage.setItem("access_token", response.data.token)
            return response.data.user
        } catch (e) {
            console.log("Error", e)
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const me = createAsyncThunk(
    "auth/me",
    async (_, thunkAPI) => {
        try {
            const response = await authAPI.me()
            console.log(response.data)
            return response.data
        } catch (e) {
            console.log("Error", e)
            return thunkAPI.rejectWithValue(e)
        }
    }
)

const initialState = {isLoggedIn: false};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(me.fulfilled, (state) => {
                state.isLoggedIn = true
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.isLoggedIn = true
            })

        // .addCase(loginUser.fulfilled, (state) => {
        //     state.isLoggedIn = true
        // })
        // .addCase(me.rejected, (state) => {
        //     state.isLoggedIn = false
        // })
        // .addCase(loginUser.rejected, (state) => {
        //     state.isLoggedIn = false
        // })
    }

})

export const {setIsLoggedIn} = authSlice.actions

export default authSlice.reducer

// Types for thunk

type LoginParamsType = {
    email: string
    password: string
}
type RegisterParamsType = {
    email: string
    password: string
    country: string
}
