import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {userAPI} from "../../api/notes-api";
import {initializeApp, loginUser} from "./authSlice";
import axios from "axios";
import {UserType} from "../../utils/types";

const initialState = {
    user: {} as UserType,
}

export const updateUserData = createAsyncThunk('profileSlice/updateUserData',
    async (params: PutUserParamsType) => {
        try {
            const res = await userAPI.updateUser(params.username, params.country)
            return res.data
        } catch (error) {
            if (axios.isAxiosError(error) && error) {
                // dispatch(setAppError(data.error || 'Some error occurred'));
                // } else (dispatch(setAppError(error.message + '. More details in the console')))
            }
        }
    })

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.user = action.payload
            })
    }
})

export type PutUserParamsType = {
    username?: string
    email?: string
    country?: string
}

export default profileSlice.reducer
