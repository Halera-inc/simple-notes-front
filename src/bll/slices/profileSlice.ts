import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {SettingsType, UserType} from "../../api/notes-api";
import {loginUser, me} from "./authSlice";



const initialState = {
    user: {

    } as UserType,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

    },
    extraReducers:  (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload
            })
            }
})

// export const {} = profileSlice.actions

export default profileSlice.reducer