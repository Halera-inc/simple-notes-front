import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react'
import {dndNotes, editNote, getNotes} from 'src/bll/slices/notesSlice';
import MainContainer from "../src/components/MainContainer";
import Note from "../src/components/Note/Note";
import s from "../src/styles/Notes.module.css"
import {useAppDispatch, useAppSelector} from "../src/utils/hooks";
import ModalWindow from "../src/components/ModalWindow";
import {colorizedColorType} from "../src/components/Note";
import {ColorSamplesType, NoteTextType} from "../src/api/notes-api";

const Notes = () => {

    const dispatch = useAppDispatch()
    const notes = useAppSelector(state => state.notes.notes)
    const searchParams = useAppSelector(state => state.notes.searchParams)
    const [modalTitle, setModalTitle] = useState('')
    const [modalColor, setModalColor] = useState<colorizedColorType>({})
    const [modalId, setModalId] = useState('');
    const [modalText, setModalText] = useState('')
    const modalBtnRef = useRef<HTMLLabelElement>(null)
    const effectRan = useRef(false)
    let legacyNotes = [] as NoteTextType[]

    useEffect(() => {
        if (!effectRan.current) {
            dispatch(getNotes())
            return () => {
                effectRan.current = true
            }
        }
    }, [dispatch])
    useEffect(() => {
        legacyNotes = [...notes]
    }, [notes])

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
    const onConfirmClickHandler = (id: string, title: string, note_text: string, color: ColorSamplesType) => {
        dispatch(editNote({id, title, note_text, color})) // todo need to fix with appAPI
    }
    const onDiscardClickHandler = () => {
        // TODO: ????????
    }

    const moveCards = useCallback((dragID: string, hoverID: string) => {
        console.log(legacyNotes)
        // console.log('MoveCard')
        console.log('dragID ', dragID)
        console.log('hoverID ', hoverID)
        // debugger
        const dragIndex = legacyNotes.findIndex((arr) => arr._id == dragID)
        const hoverIndex = legacyNotes.findIndex((arr) => arr._id == hoverID)
        // console.log('dragIndex ', dragIndex)
        // console.log('hoverIndex ', hoverIndex)


        const newArray = [...legacyNotes]
        const draggedElement = newArray.splice(dragIndex, 1)
        newArray.splice(hoverIndex, 0, draggedElement[0])
        console.log(newArray)
        if (newArray.length === legacyNotes.length) {
            dispatch(dndNotes({newNotesArray: newArray}))
        }

    }, [legacyNotes])

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
                    {notes && notes.filter(n => n.title && n.title.toLowerCase().includes(searchParams.toLowerCase())
                        || n.note_text && n.note_text.toLowerCase().includes(searchParams.toLowerCase())).map((n, i) =>
                        <Note key={n._id}
                              title={n.title}
                              note_text={n.note_text}
                              color={n.color}
                              noteId={n._id}
                              edit={onCardClickHandler}
                              createdAt={n.createdAt}
                              index={i}
                              moveCard={moveCards}
                        />
                    )}
                </div>
            </div>
        </MainContainer>
    )
}

export default Notes

