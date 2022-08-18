import {configureStore} from '@reduxjs/toolkit'
import profileReducer from './slices/profileSlice'
import notesReducer from './slices/notesSlice'

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    notes: notesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch