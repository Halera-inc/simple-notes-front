import s from './../styles/Note.module.css'
import EditIcon from "../assets/images/EditIcon";
import DeleteIcon from "../assets/images/DeleteIcon";
import colorizeNote from "../utils/colorizeNote";

export type colorizedColorType = {
    color?: string,
    borderColor?: string,
    backgroundColor?: string,
}

type NotePropsType = {
    title: string | null
    text: string | null
    color: string
    edit: (title: string | null, text: string | null, colorizedColor: colorizedColorType ) => void
}

const Note = ({color, title, text, edit}: NotePropsType) => {
    const colorizedColor = colorizeNote(color)
    return (
        <>
            <div className={s.card} style={colorizedColor} onClick={() => edit(title, text, colorizedColor)}>
                <h2 className={s.cardTitle}>{title}</h2>
                <p className={s.text}>{text}</p>
                <div className={s.cardAction}>
                    <EditIcon width={'1.5em'} height={'1.5em'} fill={colorizedColor.color}/>
                    <DeleteIcon fill={colorizedColor.color}/>
                </div>
            </div>
        </>
    )
}

export default Note;