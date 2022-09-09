import {ChangeEvent, useEffect, useRef, useState} from 'react'
import {editNote, getNotes} from 'src/bll/slices/notesSlice';
import MainContainer from "../src/components/MainContainer";
import Note from "../src/components/Note/Note";
import s from "../src/styles/Notes.module.css"
import {useAppDispatch, useAppSelector} from "../src/utils/hooks";
import ModalWindow from "../src/components/ModalWindow";
import {useRouter} from "next/router";
import {initializeApp} from "../src/bll/slices/authSlice";
import {colorizedColorType} from "../src/components/Note";
import {ColorSamplesType} from "../src/api/notes-api";

const Notes = () => {

    const router = useRouter()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const notes = useAppSelector(state => state.notes.notes)
    const [modalTitle, setModalTitle] = useState('')
    const [modalColor, setModalColor] = useState<colorizedColorType>({})
    const [modalId, setModalId] = useState('');
    const [modalText, setModalText] = useState('')
    const modalBtnRef = useRef<HTMLLabelElement>(null)

    const effectRan = useRef(false)

    useEffect(() => {
        if (!effectRan.current) {
            dispatch(getNotes())
            return () => {
                effectRan.current = true
            }
        }
    }, [dispatch])

    const onCardClickHandler = (title: string, note_text: string, colorizedColor: colorizedColorType, color: ColorSamplesType, noteId: string) => {
        title && setModalTitle(title)
        note_text && setModalText(note_text)
        setModalColor(colorizedColor)
        setModalId(noteId);
        modalBtnRef.current && modalBtnRef.current.click()
    }
    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setModalTitle(e.currentTarget.value)
    }
    const onContentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setModalText(e.currentTarget.value)
    }
    const onConfirmClickHandler = (id: string, title: string, note_text: string) => {
        dispatch(editNote({id, title, note_text})) // todo need to fix with appAPI
    }
    const onDiscardClickHandler = () => {
    }

    typeof window !== 'undefined' && !isLoggedIn && router.push('/')

    return (
        <MainContainer>
            <label ref={modalBtnRef}
                   htmlFor='my-modal'
                   className="btn modal-button hidden">
                open modal
            </label>
            <ModalWindow titleNode={modalTitle}
                         textNode={modalText}
                         typeNode={'edit'}
                         colorNote={modalColor}
                         modalId={modalId}
                         onTitleChange={onTitleChangeHandler}
                         onTextChange={onContentChangeHandler}
                         onConfirm={onConfirmClickHandler}
                         onDiscard={onDiscardClickHandler}/>
            <div className={s.notesWrapper}>
                <div className={s.notesBlock}>
                    {notes.map((n) =>
                        <Note key={n._id}
                              title={n.title}
                              note_text={n.note_text}
                              color={n.color}
                              noteId={n._id}
                              edit={onCardClickHandler}/>
                    )}
                </div>
            </div>
        </MainContainer>
    )
}

export default Notes
