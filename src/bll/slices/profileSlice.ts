import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {notesAPI, SettingsType} from "../../api/notes-api";
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

// export const loginTC = createAsyncThunk('profileSlice/login', async (params: {})=>{})

export const profileSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // setUserData(state, action: PayloadAction<{ user: UserType }>) {
        //     state.user = action.payload.user
       // }
    },
    extraReducers:  (builder)=> {
        builder
            .addCase(Me.fulfilled, (state, action) => {
                state.user = action.payload

            })
    }
})
//export const { setUserData} = profileSlice.actions
// export const {} = profileSlice.actions

export default profileSlice.reducer
