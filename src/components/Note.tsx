import s from './../styles/Note.module.css'
import EditIcon from "../assets/images/EditIcon";
import DeleteIcon from "../assets/images/DeleteIcon";
import ModalWindow from "./ModalWindow";
import {useState} from "react";


type ModalWindowType = 'edit' | 'create'

const Note = (props: { titleNode: string, textNode: string, style: any }) => {

    const [modalType, setModalType] = useState<ModalWindowType>('edit')

    const onAddNoteClickHandler = () => {                               //need to fix
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
            <ModalWindow titleNode={props.titleNode} textNode={props.textNode} modalType={modalType}/>
            <div className={s.card} style={props.style} onClick={onCardClickHandler}>
                <h2 className={s.cardTitle}>{props.titleNode}</h2>
                <p>{props.textNode}</p>
                <div className={s.cardAction}>
                    <EditIcon/>
                    <DeleteIcon/>
                </div>
            </div>
            <button className='btn mx-8 my-8' onClick={onAddNoteClickHandler}>Add Note</button>
        </>
    );
};

export default Note;