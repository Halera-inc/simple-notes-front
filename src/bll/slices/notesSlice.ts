import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import {ColorSamplesType, notesAPI, NoteTextType, NoteViewType} from 'src/api/notes-api'

export const getNotes = createAsyncThunk('notes/getNotes', async (_, thunkAPI) => {
        try {
            const res = await notesAPI.getNotes()
            const notes = res.data
            return notes
        } catch (error) {
            const data = error
            if (axios.isAxiosError(error) && data) {
                // dispatch(setAppError(data.error || 'Some error occurred'));
                // } else (dispatch(setAppError(error.message + '. More details in the console')))
                console.log({...error});
            }
            return thunkAPI.rejectWithValue([])
        }
    }
)
export const createNote = createAsyncThunk('notes/createNote', async (params: PostNoteParamsType, thunkAPI) => {
        try {
            const res = await notesAPI.createNote(params.title, params.note_text, params.color, params.note_mode)
            console.log(res.data)
            const note = res.data
            return note
        } catch (error) {
            const data = error
            if (axios.isAxiosError(error) && data) {
                // dispatch(setAppError(data.error || 'Some error occurred'));
                // } else (dispatch(setAppError(error.message + '. More details in the console')))
                console.log({...error});
            }
        }
    }
)

export const deleteNote = createAsyncThunk('notes/deleteNote', async (param: { noteId: string }, thunkAPI) => {
    try {
        const res = await notesAPI.deleteNote(param.noteId)
        return {noteId: param.noteId}
    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue(null)
    }
})

export const editNote = createAsyncThunk('notes/editNote',
    async (params: { id: string, title?: string, note_text?: string, color?: ColorSamplesType, note_mode?: NoteViewType }, thunkAPI) => {
        try {
            const res = await notesAPI.updateNote(params.id, params.title,
                params.note_text, params.color, params.note_mode)
                return {noteId: params.id, newColor: params.color, newTitle: params.title, newText: params.note_text, newMode: params.note_mode}
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(null)
        }
    })


const initialState = {
    notes: [] as Array<NoteTextType>,
    createNoteModal: false,
    searchParams: ''
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setCreateNoteModalShow(state, action: PayloadAction<{ isModalShow: boolean }>) {
            state.createNoteModal = action.payload.isModalShow
        },
        setSearchParams(state, action: PayloadAction<{newValue: string}>){
            if (action.payload.newValue.length >= 2 || action.payload.newValue === '') {
                state.searchParams = action.payload.newValue.trim()
            }

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                //пока ничего isFetching = true

            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.notes = action.payload
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.notes.push(action.payload)
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.notes.splice(state.notes.findIndex((arrow) => action.payload && arrow._id === action.payload.noteId), 1);
            })
            .addCase(editNote.fulfilled, (state, action) => {
                if (action.payload && action.payload.newTitle) {
                    state.notes[state.notes.findIndex((arrow) => action.payload && arrow._id === action.payload.noteId)].title = action.payload.newTitle
                }
                if (action.payload && action.payload.newText) {
                    state.notes[state.notes.findIndex((arrow) => action.payload && arrow._id === action.payload.noteId)].note_text = action.payload.newText
                }
                if (action.payload && action.payload.newColor) {
                    state.notes[state.notes.findIndex((arrow) => action.payload && arrow._id === action.payload.noteId)].color = action.payload.newColor
                }
                if (action.payload && action.payload.newMode) {
                    state.notes[state.notes.findIndex((arrow) => action.payload && arrow._id === action.payload.noteId)].note_mode = action.payload.newMode
                }
            })
    }
})

export const {setCreateNoteModalShow, setSearchParams} = notesSlice.actions

export default notesSlice.reducer

// T Y P E S
type PostNoteParamsType = {
    title?: string
    note_text?: string
    color?: ColorSamplesType
    note_mode?: string
}
