import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {SettingsType, userAPI} from "../../api/notes-api";
import {initializeApp} from "./authSlice";
import axios from "axios";


type UserType = {   //tmp type for develop //todo must be replace with original UserType when server API works
    id: number,
    username: string,
    email: string,
    country: string,
    createdAt: string,
    userpassword: string,
    settings: SettingsType,
}


const initialState = {
    user: {} as UserType,
}

export const updateUserData = createAsyncThunk('profileSlice/updateUserData',
    async (params: PutUserParamsType) => {
        try {
            const res = await userAPI.updateUser(params.username, params.country)
            const newUserData = res.data
            return newUserData
        } catch (error) {
            const data = error
            if (axios.isAxiosError(error) && data) {
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
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.user = action.payload
            })

    }

})

// export const {} = profileSlice.actions

export type PutUserParamsType = {
    username?: string
    email?: string
    country?: string
}
export default profileSlice.reducer
