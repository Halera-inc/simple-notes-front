import {ChangeEvent, useEffect, useRef, useState} from 'react'
import {editNote, getNotes} from 'src/bll/slices/notesSlice';
import MainContainer from "../src/components/MainContainer";
import Note from "../src/components/Note/Note";
import s from "../src/styles/Notes.module.css"
import {useAppDispatch, useAppSelector} from "../src/utils/hooks";
import ModalWindow from "../src/components/ModalWindow";
import {useRouter} from "next/router";
import {colorizedColorType} from "../src/components/Note";
import {ColorSamplesType} from "../src/api/notes-api";
import {unstable_getServerSession} from "next-auth";
import authOptions from './api/auth/[...nextauth]'
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {getSession} from "next-auth/react";

const Notes = () => {

    const router = useRouter()
    const dispatch = useAppDispatch()
    const notes = useAppSelector(state => state.notes.notes)
    const searchParams = useAppSelector(state => state.notes.searchParams)
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
                    {notes && notes.filter(n=>n.title && n.title.toLowerCase().includes(searchParams.toLowerCase())
                        || n.note_text && n.note_text.toLowerCase().includes(searchParams.toLowerCase())).map((n) =>
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

//
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

// export const getZapdosAuthSession = async (ctx: {
//     req: GetServerSidePropsContext["req"];
//     res: GetServerSidePropsContext["res"];
// }) => {
//     return await unstable_getServerSession(ctx.req, ctx.res, authOptions)
// }