import { createSlice } from "@reduxjs/toolkit";

import { NullableType } from "../store";


const initialState = {
    appError: '' as NullableType<string>,
    appIsInitialize: false,
    isAppFetching: false
};


export const appSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: {}
})

// export const {} = notesSlice.actions

export default appSlice.reducer