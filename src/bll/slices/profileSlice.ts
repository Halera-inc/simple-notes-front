import {createSlice} from '@reduxjs/toolkit'
import {UserType} from "../../api/notes-api";


const initialState = {
    user: {} as UserType,
}

export const profileSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {}
})

// export const {} = profileSlice.actions

export default profileSlice.reducer