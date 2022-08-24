import {useEffect} from 'react'
import {getNotes} from 'src/bll/slices/notesSlice';
import MainContainer from "../src/components/MainContainer";
import Note from "../src/components/Note";
import s from "../src/styles/Notes.module.css"
import {useAppDispatch, useAppSelector} from "../src/utils/hooks";

const colorStyle = {
    backgroundColor: '#E5F1FD',
    color: '#5590C1',
    borderColor: '#5590C1',
}

const Notes = () => {

    const dispatch = useAppDispatch()
    const notes = useAppSelector(state => state.notes.notes)

    useEffect(() => {
        dispatch(getNotes())
    }, [dispatch, notes])

    return (
        <MainContainer>
            <div className='mx-10 my-5'>
                <h1>My notes</h1>
                <div className="flex">
                    {notes.map((n) =>
                        <Note title={n.title} text={n.notetext} color={n.color}
                              key={n.id} id={n.id}/>
                    )}
                </div>
            </div>
        </MainContainer>
    )
}

export default Notes
