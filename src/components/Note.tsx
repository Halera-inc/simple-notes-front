import s from './../styles/Note.module.css'
import EditIcon from "../assets/images/EditIcon";
import DeleteIcon from "../assets/images/DeleteIcon";


type NotePropsType = {
    title: string | null
    text: string | null
    color: string
    edit: (title: string | null, text:string | null) => void
}

const Note = ({color, title, text, edit}: NotePropsType) => {

    return (
        <>
            <div className={s.card} onClick={()=>edit(title,text)}>
                <h2 className={s.cardTitle}>{title}</h2>
                <p>{text}</p>
                <div className={s.cardAction}>
                    <EditIcon/>
                    <DeleteIcon/>
                </div>
            </div>
        </>
    )
}

export default Note;