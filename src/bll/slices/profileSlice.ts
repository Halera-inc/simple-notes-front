import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {userAPI} from "../../api/notes-api";
import axios from "axios";
import {UserType} from "../../utils/types";

const initialState = {
    user: {} as UserType,
    userAvatar:"https://yandex.by/images/search?text=%D0%9A%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20100px%20%D0%BD%D0%B0%20100px&source=related-duck&lr=157&pos=0&img_url=http%3A%2F%2Fforum.svslearn.com%2Fassets%2Fuploads%2Fprofile%2F3545-profileavatar.png&rpt=simage",
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
    country?: string
}

export default profileSlice.reducer
