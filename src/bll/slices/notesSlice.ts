import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import {ColorSamplesType, notesAPI, NoteTextType, NoteViewType} from "../../api/notes-api";


export const getNotes = createAsyncThunk('notes/getNotes', async (_, thunkAPI) => {
        try {
            const res = await notesAPI.getNotes()
            const notes = res.data
            return notes.notes
        } catch (error) {
            if (axios.isAxiosError(error) && error) {
                console.log({...error});
            }
            return thunkAPI.rejectWithValue([])
        }
    }
)
export const createNote = createAsyncThunk('notes/createNote', async (params: PostNoteParamsType, thunkAPI) => {
        try {
            const res = await notesAPI.createNote(params.title, params.note_text, params.color, params.note_mode)
            const newNote = res.data.newNote
            console.log(newNote)
            return newNote
        } catch (error) {
            if (axios.isAxiosError(error) && error) {
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

export const dndNotes = createAsyncThunk('notes/dndNote',
    async (params: { newNotesArray: NoteTextType[]}, thunkAPI) => {
        try {
            const res = await notesAPI.dndNotes(params.newNotesArray)
            return res.data.insertedNotes
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(null)
        }
    })

const initialState = {
    notes: [] as Array<NoteTextType>,
    editNoteModalShow: false,
    addNoteNodalShow: false,
    searchParams: '',
    pushPin:false,
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setPushPin(state, action:PayloadAction<{value:boolean}>){
            state.pushPin  = action.payload.value
        },
        setEditNoteModalShow(state, action: PayloadAction<{ isModalShow: boolean }>) {
            state.editNoteModalShow = action.payload.isModalShow
        },
        setAddNoteNodalShow(state, action: PayloadAction<{ isModalShow: boolean }>) {
            state.addNoteNodalShow = action.payload.isModalShow
        },
        setSearchParams(state, action: PayloadAction<{newValue: string}>){
            if (action.payload.newValue.length >= 2 || action.payload.newValue === '') {
                state.searchParams = action.payload.newValue.trim()
            }

        }
    },
    extraReducers: (builder) => {
        builder
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
            .addCase(dndNotes.fulfilled, (state, action) => {
                state.notes = action.payload
            })
    }
})

export const {setPushPin, setEditNoteModalShow, setAddNoteNodalShow, setSearchParams} = notesSlice.actions
export const notesTestReducer = notesSlice.reducer
export default notesSlice.reducer

// T Y P E S
type PostNoteParamsType = {
    title?: string
    note_text?: string
    color?: ColorSamplesType
    note_mode?: string
}
