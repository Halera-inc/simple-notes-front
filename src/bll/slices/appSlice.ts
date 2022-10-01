import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NullableType} from "../store";


const initialState = {
    appError: '' as NullableType<string>,
    isAppFetching: false
};


export const appSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setIsAppFetching(state, action: PayloadAction<boolean>) {
            state.isAppFetching = action.payload
        }
    },
    extraReducers: {}
})


export const {setIsAppFetching} = appSlice.actions;

export default appSlice.reducer
