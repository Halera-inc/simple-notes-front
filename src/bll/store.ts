import {combineReducers, configureStore} from '@reduxjs/toolkit'
import profileReducer from './slices/profileSlice'
import notesReducer from './slices/notesSlice'
import authReducer from "./slices/authSlice";
import appReducer from "./slices/appSlice";
import themeReducer from "./slices/themeSlice";

export const rootReducer = combineReducers({
    profile: profileReducer,
    notes: notesReducer,
    auth: authReducer,
    app: appReducer,
    theme: themeReducer

})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type NullableType<T> = null | T


