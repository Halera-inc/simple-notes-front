import { notesTestReducer, setSearchParams} from "../notesSlice"
import {setCreateNoteModalShow} from "../notesSlice";



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
        const endState = notesTestReducer(startState, action)
        expect(endState.createNoteModal).toBe(true)
           })
    it('search notes',()=>{
        const action = setSearchParams({newValue: 'My note'})
        const endState = notesTestReducer(startState,action)
        expect(endState.searchParams).toBe('My note')
        expect(endState.searchParams.length).toBe(7)
    })
})
