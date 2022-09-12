import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {SettingsType, userAPI} from "../../api/notes-api";
import {userAPI} from "../../api/notes-api";
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
            }
        }
    })

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
