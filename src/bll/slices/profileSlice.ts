import {createSlice} from '@reduxjs/toolkit'
import {UserType} from 'src/utils/types'

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