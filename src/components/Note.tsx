import s from './../styles/Note.module.css'
import EditIcon from "../assets/images/EditIcon";
import DeleteIcon from "../assets/images/DeleteIcon";
import colorizeNote from "../utils/colorizeNote";

type NotePropsType = {
    title?: string
    note_text?: string
    color?: string
    edit: (title: string, note_text: string) => void

}
export type colorizedColorType = {
    color?: string,
    borderColor?: string,
    backgroundColor?: string,
}

const Note = ({title = '', note_text = '', color, edit}: NotePropsType) => {
    const colorizedColor = colorizeNote(color)
    return (
        <>
            <div className={s.card} style={colorizedColor} onClick={() => edit(title, note_text)}>
                <h2 className={s.cardTitle}>{title}</h2>
                <p className={s.text}>{note_text}</p>
                <div className={s.cardAction}>
                    <EditIcon fill={colorizedColor.color}/>
                    <DeleteIcon fill={colorizedColor.color}/>
                </div>
            </div>
        </>
    )
}

export default Note;