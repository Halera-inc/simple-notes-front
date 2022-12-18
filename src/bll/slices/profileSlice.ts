import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {userAPI} from "../../api/notes-api";
import axios from "axios";
import {UserType} from "../../utils/types";

const initialState = {
    user: {} as UserType,
    userAvatar:'' as string || null,
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
    reducers: {
        changeImage(state,action:PayloadAction<string | null>){
            state.userAvatar=action.payload
        }
    },
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

export const  profileReducer = profileSlice.reducer
export const {changeImage} = profileSlice.actions;

  export default profileSlice.reducer
