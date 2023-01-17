import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {userAPI} from "../../api/notes-api";
import axios from "axios";
import {UserType} from "../../utils/types";

const initialState = {
    user: {} as UserType,
    userAvatar:'' as string | null,
    newImageUploaded: false as boolean,
   // newImageIsSave: false as boolean,
    isUserInitialize: false as boolean,

}

export const updateUserData = createAsyncThunk('profileSlice/updateUserData',
    async (params: PutUserParamsType) => {
        try {
            const id = ''
            const res = await userAPI.updateUser(id, params.username, params.country, params.image)
            console.log(res.data)
            return res.data
        } catch (error) {
            if (axios.isAxiosError(error) && error) {
            }
        }
    })

export const updateUserIcon = createAsyncThunk('profileSlice/updateUserIcon',
    async (params: DataForIconUpdateType) => {
        console.log(params)
        try {
            const res = await userAPI.updateIcon(params.user, params.icon)
            console.log(res)
            return res.data
            
        } catch (error) {
            console.log(error)
        }
})

export const getUserIcon = createAsyncThunk('profileSlice/getUserIcon',
    async () => {
        try {
            const res = await userAPI.getIcon()
            return res.data.icon[0].icon
        } catch (error) {
            console.log(error)
        }
    })

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        changeImage(state,action:PayloadAction<string | null>){
            state.userAvatar = action.payload
            state.newImageUploaded = true
            //state.newImageIsSave = false

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
        },
        setUserInitialize(state){
            state.isUserInitialize = true
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(getUserIcon.fulfilled, (state, action) => {
                state.userAvatar = action.payload
            })
            .addCase(updateUserIcon.fulfilled, (state) => {
                state.newImageUploaded = false
                //state.newImageIsSave = true
            })

    }
})

export type PutUserParamsType = {
    //TODO fix option for id param
    id?: string
    username?: string
    country?: string
    image?: string
}

export type DataForIconUpdateType = {
    user: string,
    icon: string
}

export const  profileReducer = profileSlice.reducer
export const {changeImage, setUserData} = profileSlice.actions;

export default profileSlice.reducer
