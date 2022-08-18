import {createSlice} from '@reduxjs/toolkit'
import {NoteTextType, NoteTodoType} from 'src/utils/types'


const initialState = {
    notes: [] as Array<NoteTextType | NoteTodoType>
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: {}
})

// export const {} = notesSlice.actions

export default notesSlice.reducer