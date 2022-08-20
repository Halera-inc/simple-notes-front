import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import {notesAPI, NoteTextType, NoteTodoType} from 'src/api/notes-api'


export const getNotes = createAsyncThunk('notes/getNotes', async (thunkAPI) => {
        try {
            const res = await notesAPI.getNotes()
            const notes = res.data.results
            return notes
        } catch (error: any) {
            const data = error?.response?.data;
            if (axios.isAxiosError(error) && data) {
                // dispatch(setAppError(data.error || 'Some error occurred'));
                // } else (dispatch(setAppError(error.message + '. More details in the console')))
                console.log({...error});
            }
        }
    }
)

export const createNotes = createAsyncThunk('notes/createNotes', async (title: string, thunkAPI) => {
    try {
        const res = await notesAPI.createNote(title)
        const newNote = res.data.data.item
        return newNote
    } catch (error: any) {
        const data = error?.response?.data;
        if (axios.isAxiosError(error) && data) {
            console.log({...error})
        }
    }
})
// export const editNote = createAsyncThunk('notes/editNote', async (params) => {
//     try {
//
//     } catch (error) {
//
//     }
// })

const initialState = {
    notes: [] as Array<NoteTextType>,
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                //пока ничего
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.notes = action.payload
            })
            .addCase(createNotes.pending, (state) => {
                //пусто
            })
            .addCase(createNotes.fulfilled, (state, action: PayloadAction<any>) => {
                state.notes.map((m) => m.id === action.payload.id ? {...m, title: action.payload.title} : m)
            })
    }
})

// export const {} = notesSlice.actions

export default notesSlice.reducer
