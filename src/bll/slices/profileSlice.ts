import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {userAPI} from "../../api/notes-api";
import axios from "axios";
import {UserType} from "../../utils/types";

const initialState = {
    user: {} as UserType,
    userAvatar:'' as string | null,
    newImageUploaded: false as boolean
}

export const updateUserData = createAsyncThunk('profileSlice/updateUserData',
    async (params: PutUserParamsType) => {
        try {
            const res = await userAPI.updateUser(params.id, params.username, params.country, params.image)
            console.log(res.data)
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
            state.newImageUploaded = true
        },
        setUserData(state, action:PayloadAction<{userData: UserType | undefined}>){
            if (action.payload.userData){
                console.log(action.payload.userData)
                state.user.id = action.payload.userData.id
                state.user.name = action.payload.userData.name
                state.user.email = action.payload.userData.email
                state.user.image = action.payload.userData.image
                state.user.country = action.payload.userData.country
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
    id: string
    username?: string
    country?: string
    image?: string
}

export const  profileReducer = profileSlice.reducer
export const {changeImage, setUserData} = profileSlice.actions;

export default profileSlice.reducer
