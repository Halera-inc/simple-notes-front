import {useEffect} from 'react'
import {getNotes} from 'src/bll/slices/notesSlice';
import MainContainer from "../src/components/MainContainer";
import Note from "../src/components/Note";
import s from "../src/styles/Notes.module.css"
import {useAppDispatch, useAppSelector} from "../src/utils/hooks";

const Notes = () => {

    const dispatch = useAppDispatch()
    const notes = useAppSelector(state => state.notes.notes)

    useEffect(() => {
        dispatch(getNotes())
    }, [dispatch, notes])

    return (
        <MainContainer>
            <div className={s.notesBlock}>
                <h1>My notes</h1>
                <div className={'flex row-auto flex-wrap'}>
                    {notes.map((n) =>
                        <Note title={n.title} text={n.notetext} color={n.color}
                              key={n.id}/>
                    )}
                </div>
            </div>
        </MainContainer>
    )
}

export default Notes
