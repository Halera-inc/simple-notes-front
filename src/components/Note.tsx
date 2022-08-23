import s from './../styles/Note.module.css'
import EditIcon from "../assets/images/EditIcon";
import DeleteIcon from "../assets/images/DeleteIcon";
import ModalWindow from "./ModalWindow";
import {useState} from "react";

type ModalWindowType = 'edit' | 'create'
type NotePropsType = {
    title: string | null
    text: string | null
    color: string
}

const Note = ({color, title, text}: NotePropsType) => {

    const [modalType, setModalType] = useState<ModalWindowType>('edit')
    //
    // if (color === 'blue') color = "#5590C1"
    // if (color === 'green') color = "#5E9C80"
    // if (color === 'violet') color = "#866FA7"
    // if (color === 'mustard') color = "#C6B05D"
    // if (color === 'dark') color = "#444343"
    // if (color === 'default') color = "#4e5458"

    const onAddNoteClickHandler = () => { // todo: need to fix
        setModalType("create")
        let btn = document.getElementById('show-modal-btn')
        btn && btn.click()
    }
    const onCardClickHandler = () => {
        setModalType("edit")
        let btn = document.getElementById('show-modal-btn')
        btn && btn.click()
    }

    return (
        <>
            <label id='show-modal-btn' htmlFor="my-modal" className="btn modal-button hidden">open modal</label>
            <ModalWindow titleNode={title ? title : ''}
                         textNode={text ? text : ''}
                         modalType={modalType}/>
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