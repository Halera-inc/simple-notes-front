import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {NullableType} from "../store";


const initialState = {
    appError: '' as NullableType<string>,
    appIsInitialize: false,
    isAppFetching: false
};


export const appSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setIsAppFetching(state, action: PayloadAction<{ isAppFetching: true }>) {
            state.isAppFetching = action.payload.isAppFetching
        }
    },
    extraReducers: {}
})

// export const {} = notesSlice.actions

export default appSlice.reducer
