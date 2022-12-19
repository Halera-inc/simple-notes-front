import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {userAPI} from "../../api/notes-api";
import axios from "axios";
import {UserType} from "../../utils/types";

const initialState = {
    user: {} as UserType,
    userAvatar:'' as string | null,
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
            state.userAvatar = action.payload
        },
        setUserData(state, action:PayloadAction<{userData: UserType | undefined}>){
            if (action.payload.userData){
                state.user.id = action.payload.userData.id
                state.user.name = action.payload.userData.name
                state.user.email = action.payload.userData.email
                state.user.image = action.payload.userData.image
                if (action.payload.userData.image !== undefined){
                    state.userAvatar = action.payload.userData.image
                }
            }
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
export const {changeImage, setUserData} = profileSlice.actions;

export default profileSlice.reducer
