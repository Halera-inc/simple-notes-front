import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import {notesAPI, NoteTextType, NoteTodoType} from 'src/api/notes-api'


export const getNotes = createAsyncThunk('notes/getNotes', async (thunkAPI) => {
    try {
        const res = await notesAPI.getNotes()
        console.log(res)
        const notes = res.data
        return notes
    } catch (error) {
        const data = error
        if (axios.isAxiosError(error) && data) {
            // dispatch(setAppError(data.error || 'Some error occurred'));
            // } else (dispatch(setAppError(error.message + '. More details in the console')))
            console.log({...error});
        }
    }}
)
export const createNote = createAsyncThunk('notes/createNote', async (params: PostNoteParamsType,thunkAPI) => {
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
    }}
)


    // export const editNote = createAsyncThunk('notes/editNote', async (params) => {
    //     try {
    //
    //     } catch (error) {
    //
    //     }
    // })

    const initialState = {
        notes: [] as Array<NoteTextType>,
        createNoteModal: false
    }

    export const notesSlice = createSlice({
        name: 'notes',
        initialState,
        reducers: {
            setCreateNoteModalShow(state, action: PayloadAction<{isModalShow:boolean}>){
                state.createNoteModal = action.payload.isModalShow
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
        }
    })

export const {setCreateNoteModalShow} = notesSlice.actions

    export default notesSlice.reducer


// T Y P E S

type PostNoteParamsType = {
    title?: string
    note_text?: string
    color?: string
    note_mode?: string
}
