import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {notesAPI, SettingsType, userAPI} from "../../api/notes-api";
import axios from "axios";
import {Me} from "src/bll/slices/authSlice";
import {notesSlice} from "src/bll/slices/notesSlice";


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
    //user: {} as UserType,
    user: {
        id: 3,
        username: 'UserName',
        email: 'UserName@gmail.com',
        country: 'Belarus',
        userpassword: '12345678',
        createdAt: '2022-08-23T14:40:22.383Z',
    } as UserType,
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
    name: 'user',
    initialState,
    reducers: {
        // setUserData(state, action: PayloadAction<{ user: UserType }>) {
        //     state.user = action.payload.user
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(Me.pending, (state) => {
                // setIsAppFetching(true)
            })
            .addCase(Me.fulfilled, (state, action) => {
                state.user = action.payload

            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.user = action.payload
            })

    }
})
//export const { setUserData} = profileSlice.actions
// export const {} = profileSlice.actions

export type PutUserParamsType = {
    username?: string
    email?: string
    country?: string
}
export default profileSlice.reducer
