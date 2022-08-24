import s from './../styles/Note.module.css'
import EditIcon from "../assets/images/EditIcon";
import DeleteIcon from "../assets/images/DeleteIcon";
import ModalWindow from "./ModalWindow";
import {useEffect, useRef, useState} from "react";
import {useAppSelector} from "../utils/hooks";


type ModalWindowType = 'edit' | 'create'
type NotePropsType = {
    title: string | null
    text: string | null
    color: string
    id: number
}

const Note = ({color, title, text, id}: NotePropsType) => {

    const isModalShow = useAppSelector((state) => state.notes.createNoteModal)
    const [modalType, setModalType] = useState<ModalWindowType>('edit')
    const modalBtnRef = useRef<HTMLLabelElement>(null)
    const refId = `show-modal-btn-${id}`
    const modalWindowId = `my-modal-${id}`


    if (color === 'blue') color = "#5590C1"
    if (color === 'green') color = "#5E9C80"
    if (color === 'violet') color = "#866FA7"
    if (color === 'mustard') color = "#C6B05D"
    if (color === 'dark') color = "#444343"
    if (color === 'default') color = "#4e5458"

    //
    useEffect(() => {
        debugger
        isModalShow && onAddNoteClickHandler()
    }, [isModalShow])


    const onAddNoteClickHandler = () => {
        debugger
        setModalType("create")
        console.log(modalBtnRef.current)
        modalBtnRef.current && modalBtnRef.current.click()
    }
    const onCardClickHandler = () => {
        setModalType("edit")
        modalBtnRef.current && modalBtnRef.current.click()
    }

    return (
        <>
            <label ref={modalBtnRef} id={refId} htmlFor={modalWindowId} className="btn modal-button hidden">open
                modal</label>
            <ModalWindow titleNode={title ? title : ''}
                         textNode={text ? text : ''}
                         modalType={modalType}
                         refId={id}
                         modalWindowId={modalWindowId}/>
            <div className={s.card} onClick={onCardClickHandler}>
                <h2 className={s.cardTitle}>{title}</h2>
                <p>{text}</p>
                <div className={s.cardAction}>
                    <EditIcon/>
                    <DeleteIcon/>
                </div>
            </div>
            {/*<button className='btn mx-8 my-8' onClick={onAddNoteClickHandler}>Add Note</button>*/}
        </>
    )
}

export default Note;