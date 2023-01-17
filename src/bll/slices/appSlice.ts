import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NullableType} from "../store";
import {AppSuccessType} from "../../utils/types"

const initialState = {
    appError: '' as NullableType<string>,
    isAppFetching: false,
    isAppSuccess: {} as AppSuccessType
};


export const appSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setIsAppFetching(state, action: PayloadAction<boolean>) {
            state.isAppFetching = action.payload
        },
        setIsAppSuccess(state,action:PayloadAction<AppSuccessType>){
            state.isAppSuccess = action.payload
        }
    },
    extraReducers: {}
})

export const  appReducer = appSlice.reducer
export const {setIsAppFetching,setIsAppSuccess} = appSlice.actions;

export default appSlice.reducer
