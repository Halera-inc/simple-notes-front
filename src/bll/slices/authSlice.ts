import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {NullableType} from "../store";
import {authAPI} from "../../api/notes-api";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (params: RegisterParamsType, thunkAPI) => {
        try {
            console.log(params)
            const response = await authAPI.register(params.email, params.password, params.country)
            console.log("response", response)
            if (response.status === 200) {
                return response.data.message
            } else {
                return thunkAPI.rejectWithValue(response)
            }
        } catch (e) {
            console.log("Error", e)
            thunkAPI.rejectWithValue(e)
        }
    }
)
export const loginUser = createAsyncThunk(
    "auth/login",
    async (params: LoginParamsType, thunkAPI) => {
        try {
            const response = await authAPI.login(params.email, params.password)
            console.log("response", response)
            if (response.status === 200) {
                localStorage.setItem("access_token", response.data.token)
                return response
            } else {
                return thunkAPI.rejectWithValue(response)
            }
        } catch (e) {
            console.log("Error", e)
            thunkAPI.rejectWithValue(e)
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
            thunkAPI.rejectWithValue(e)
        }
    }
)


const initialState = {};


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {}
})

// export const {} = notesSlice.actions

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