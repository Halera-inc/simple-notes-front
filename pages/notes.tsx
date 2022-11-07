import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react'
import {dndNotes, editNote, getNotes, setEditNoteModalShow} from 'src/bll/slices/notesSlice';
import MainContainer from "../src/components/MainContainer";
import Note from "../src/components/Note/Note";
import s from "../src/styles/Notes.module.css"
import {useAppDispatch, useAppSelector} from "../src/utils/hooks";
import ModalWindow from "../src/components/ModalWindow";
import {colorizedColorType} from "../src/components/Note";
import {ColorSamplesType} from "../src/api/notes-api";
import {getSession} from "next-auth/react";
import {GetServerSideProps, GetServerSidePropsContext} from "next";


const Notes = () => {

    const dispatch = useAppDispatch()
    const notes = useAppSelector(state => state.notes.notes)
    const searchParams = useAppSelector(state => state.notes.searchParams)
    const [modalTitle, setModalTitle] = useState('')
    const [modalColor, setModalColor] = useState<colorizedColorType>({})
    const [modalId, setModalId] = useState('');
    const [modalText, setModalText] = useState('')
    const effectRan = useRef(false)
    const modalShow = useAppSelector(state => state.notes.editNoteModalShow)


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
        dispatch(setEditNoteModalShow({isModalShow: true}))
    }
    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setModalTitle(e.currentTarget.value)
    }
    const onContentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setModalText(e.currentTarget.value)
    }
    const onConfirmClickHandler = (id: string, title: string, note_text: string, color: ColorSamplesType) => {
        dispatch(editNote({id, title, note_text, color})) // todo need to fix with appAPI
        dispatch(setEditNoteModalShow({isModalShow: false}))
        setModalTitle('')
        setModalText('')
    }
    const onDiscardClickHandler = () => {
        dispatch(setEditNoteModalShow({isModalShow: false}))
        setModalTitle('')
        setModalText('')
    }

    const moveCards = useCallback((dragID: string, hoverID: string) => {
        let legacyNotes = [...notes]
        const dragIndex = legacyNotes.findIndex((arr) => arr._id == dragID)
        const hoverIndex = legacyNotes.findIndex((arr) => arr._id == hoverID)
        const newArray = [...legacyNotes]
        const draggedElement = newArray.splice(dragIndex, 1)
        newArray.splice(hoverIndex, 0, draggedElement[0])
        if (newArray.length === legacyNotes.length) {
            dispatch(dndNotes({newNotesArray: newArray}))
        }
    }, [notes, dispatch])
    return (
        <MainContainer>
            {modalShow && <ModalWindow titleNode={modalTitle}
                                       textNode={modalText}
                                       typeNode={'edit'}
                                       colorNote={modalColor}
                                       modalId={modalId}
                                       onTitleChange={onTitleChangeHandler}
                                       onTextChange={onContentChangeHandler}
                                       onConfirm={onConfirmClickHandler}
                                       modalShow={modalShow}
                                       onDiscard={onDiscardClickHandler}

            /> }



            <div className={"dark:bg-grey pl-[100px] h-[100%] min-h-[100vh] pt-[70px]"}>
                {notes.find(n =>  n.pinned) ? <div className={s.fixNoteBlock}>
                    {notes && notes.filter(n => n.title && n.title.toLowerCase().includes(searchParams.toLowerCase()) && n.pinned
                        || n.note_text && n.note_text.toLowerCase().includes(searchParams.toLowerCase()) && n.pinned).map((n, i) =>
                        <Note key={n._id}
                              title={n.title}
                              note_text={n.note_text}
                              color={n.color}
                              noteId={n._id}
                              edit={onCardClickHandler}
                              createdAt={n.createdAt}
                              index={i}
                              moveCard={moveCards}
                              pinned={n.pinned}
                        />
                    )}
                </div>: ''}
                <div className={s.notesBlock}>
                    {notes && notes.filter(n => n.title && n.title.toLowerCase().includes(searchParams.toLowerCase())&& !n.pinned
                        || n.note_text && n.note_text.toLowerCase().includes(searchParams.toLowerCase()) && !n.pinned).map((n, i) =>
                        <Note key={n._id}
                              title={n.title}
                              note_text={n.note_text}
                              color={n.color}
                              noteId={n._id}
                              edit={onCardClickHandler}
                              createdAt={n.createdAt}
                              index={i}
                              moveCard={moveCards}
                              pinned={n.pinned}
                        />
                    )}
                </div>
                </div>
        </MainContainer>
    )
}

export default Notes

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);
    console.log(session)
    if (!session) {
        return {
            redirect: {destination: '/login', permanent: false},
            props: {}
        }
    }
    return {
        props: {session}
    }
}
