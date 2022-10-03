import {notesReducer, setSearchParams} from "../notesSlice"
import {setCreateNoteModalShow} from "../notesSlice";
import {NoteTextType} from "src/api/notes-api";


type StartStateType = {
    notes: []
    createNoteModal: boolean
    searchParams: string
}
let startState:StartStateType
beforeEach(() => {
    startState = {
        notes: [],
        createNoteModal: false,
        searchParams: ""
    }
});
describe('reducer should create notes', () => {
    it('create note', () => {
        const action = setCreateNoteModalShow({isModalShow: true})
        const endState = notesReducer(startState, action)
        expect(endState.createNoteModal).toBe(true)
           })
    it('search notes',()=>{
        const action = setSearchParams({newValue: 'My note'})
        const endState = notesReducer(startState,action)
        expect(endState.searchParams).toBe('My note')
        expect(endState.searchParams.length).toBe(7)
    })
})
