import {ChangeEvent, useEffect, useRef, useState} from 'react'
import {getNotes} from 'src/bll/slices/notesSlice';
import MainContainer from "../src/components/MainContainer";
import Note from "../src/components/Note";
import {useAppDispatch, useAppSelector} from "../src/utils/hooks";
import ModalWindow from "../src/components/ModalWindow";

const colorStyle = {
    backgroundColor: '#E5F1FD',
    color: '#5590C1',
    borderColor: '#5590C1',
}
const Notes = () => {

    const dispatch = useAppDispatch()
    const notes = useAppSelector(state => state.notes.notes)
    const [modalTitle, setModalTitle] = useState('')
    const [modalText, setModalText] = useState('')
    const modalBtnRef = useRef<HTMLLabelElement>(null)

    useEffect(() => {
        dispatch(getNotes())
    }, [dispatch])


    const onCardClickHandler = (title: string | null, text: string | null) => {
        title && setModalTitle(title)
        text && setModalText(text)
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
                         typeNode={'edit'}
                         onTitleChange={onTitleChangeHandler}
                         onTextChange={onContentChangeHandler}
                         onConfirm={onConfirmClickHandler}
                         onDiscard={onDiscardClickHandler}/>
            <div className='mx-10 my-5'>
                <h1>My notes</h1>
                <div className="flex">
                    {notes.map((n) =>
                        <Note title={n.title} text={n.notetext} color={n.color}
                              key={n.id} edit={onCardClickHandler}/>
                    )}
                </div>
            </div>
        </MainContainer>
    )
}

export default Notes
