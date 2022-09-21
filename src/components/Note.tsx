import s from './../styles/Note.module.css'
import EditIcon from "../assets/images/EditIcon";
import DeleteIcon from "../assets/images/DeleteIcon";
import colorizeNote from "../utils/colorizeNote";
import {useState} from "react";
import {ColorSamplesType} from "../api/notes-api";
import ColorizedBar from "./Note/ColorizedBar";

type NotePropsType = {
    title?: string
    note_text?: string
    color: ColorSamplesType
    noteId: string
    edit: (title: string, note_text: string,colorizedColor:colorizedColorType,color:ColorSamplesType,noteId:string) => void

}
export type colorizedColorType = {
    color?: string,
    borderColor?: string,
    backgroundColor?: string,
}

const Note = ({title = '', note_text = '', color,edit,noteId}: NotePropsType) => {
    const colorizedColor = colorizeNote(color)
    const [showColorBar, setShowColorBar] = useState(false)
    return (
        <>
            <div className={s.card} style={colorizedColor} onClick={() => edit(title, note_text,colorizedColor,color,noteId)}>
                <h2 className={s.cardTitle}>{title}</h2>
                <p className={s.text}>{note_text}</p>
                <div className={s.cardAction}>
                    <EditIcon fill={colorizedColor.color}/>
                    <DeleteIcon fill={colorizedColor.color}/>
                    <ColorizedBar noteId={noteId} showColorBar={showColorBar}  setShowColorBar={setShowColorBar} currentColor={color}/>

                </div>
            </div>
        </>
    )
}

export default Note;