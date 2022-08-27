import {createSlice} from '@reduxjs/toolkit'
import {SettingsType} from "../../api/notes-api";


type UserType = {   //tmp type for develop //todo must be replace with original UserType when server API works
    id: number,
    username: string,
    email: string,
    country: string,
    dateofregistered: string,
    userpassword: string,
    settings: SettingsType,
}


const initialState = {
    // user: {} as UserType,
    user: {
        id: 3,
        username: 'UserName',
        email: 'UserName@gmail.com',
        country: 'Belarus',
        userpassword: '12345678',
        dateofregistered: '2022-08-23T14:40:22.383Z',
    } as UserType,
}

// export const loginTC = createAsyncThunk('profileSlice/login', async (params: {})=>{})

export const profileSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {}
})

// export const {} = profileSlice.actions

export default profileSlice.reducer