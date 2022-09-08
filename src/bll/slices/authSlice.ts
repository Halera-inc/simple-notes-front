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

export const initializeApp = createAsyncThunk(
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

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload
        },
        setIsInitialized(state, action: PayloadAction<boolean>) {
            state.isInitialized = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeApp.fulfilled, (state) => {
                state.isLoggedIn = true
                state.isInitialized = true
            })
            .addCase(initializeApp.rejected, (state) => {
                state.isLoggedIn = false
                state.isInitialized = true
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.isLoggedIn = true
            })
    }})
export const {setIsLoggedIn, setIsInitialized} = authSlice.actions

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
}
