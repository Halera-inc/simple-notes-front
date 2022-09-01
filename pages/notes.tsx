import {ChangeEvent, useEffect, useRef, useState} from 'react'
import {getNotes} from 'src/bll/slices/notesSlice';
import MainContainer from "../src/components/MainContainer";
import Note, {colorizedColorType} from "../src/components/Note";
import s from "../src/styles/Notes.module.css"
import {useAppDispatch, useAppSelector} from "../src/utils/hooks";
import ModalWindow from "../src/components/ModalWindow";

const Notes = () => {

    const dispatch = useAppDispatch()
    const notes = useAppSelector(state => state.notes.notes)
    const [modalTitle, setModalTitle] = useState('')
    const [modalColor, setModalColor] = useState<colorizedColorType>( {})
    const [modalText, setModalText] = useState('')
    const modalBtnRef = useRef<HTMLLabelElement>(null)

    useEffect(() => {
        dispatch(getNotes())
    }, [dispatch],)


    const onCardClickHandler = (title: string | null, text: string | null, colorizedColor: colorizedColorType) => {
        title && setModalTitle(title)
        text && setModalText(text)
        setModalColor(colorizedColor)
        modalBtnRef.current && modalBtnRef.current.click()
    }
    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setModalTitle(e.currentTarget.value)
    }
    const onContentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setModalText(e.currentTarget.value)
    }
    const onConfirmClickHandler = () => {
        alert(`Save in Edit mode. Title: ${modalTitle}. Text: ${modalText}`)  // todo need to fix with appAPI
    }
    const onDiscardClickHandler = () => {
        alert('Cancel in Edit mode') // todo need to fix with appAPI
    }

    return (
        <MainContainer>
            <label ref={modalBtnRef} htmlFor='my-modal' className="btn modal-button hidden">open
                modal</label>

            <ModalWindow titleNode={modalTitle}
                         textNode={modalText}
                         colorNote={modalColor}
                         typeNode={'edit'}
                         onTitleChange={onTitleChangeHandler}
                         onTextChange={onContentChangeHandler}
                         onConfirm={onConfirmClickHandler}
                         onDiscard={onDiscardClickHandler}/>
            <div className={s.notesWrapper}>
                <div className={s.notesBlock}>
                    {notes.map((n) =>
                        <Note key={n.id}
                              title={n.title}
                              text={n.notetext}
                              color={n.color}
                              edit={onCardClickHandler}/>
                    )}
                </div>
            </div>
        </MainContainer>
    )
}

export default Notes
