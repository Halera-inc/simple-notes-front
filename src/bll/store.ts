import {combineReducers, configureStore} from '@reduxjs/toolkit'
import profileReducer from './slices/profileSlice'
import notesReducer from './slices/notesSlice'


export const rootReducer = combineReducers({
    profile: profileReducer,
    notes: notesReducer,
    // app: appReducer,
})

export const store = configureStore({
    reducer: rootReducer,


})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type NullableType<T> = null | T
