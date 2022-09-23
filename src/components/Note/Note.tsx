import s from '../../styles/Note.module.css'
import EditIcon from "../../assets/images/EditIcon";
import DeleteIcon from "../../assets/images/DeleteIcon";
import colorizeNote from "../../utils/colorizeNote";
import {useState} from 'react';
import {useAppDispatch} from "../../utils/hooks";
import {deleteNote} from "../../bll/slices/notesSlice";
import ColorizedBar from './ColorizedBar';
import React from 'react'
import {ColorSamplesType} from 'src/api/notes-api';
import {colorizedColorType} from "../Note";
import {cropText} from "../../utils/cropText";

type NotePropsType = {
    title?: string
    note_text?: string
    color: ColorSamplesType
    noteId: string
    edit: (title: string, note_text: string, colorizedColor: colorizedColorType, color: ColorSamplesType, noteId: string) => void
    createdAt?: Date
}

const Note = ({
                  title = '',
                  note_text = '',
                  color,
                  edit,
                  noteId,
                  createdAt
              }: NotePropsType) => {
    const dispatch = useAppDispatch()
    const colorizedColor = colorizeNote(color)
    const [showColorBar, setShowColorBar] = useState(false)

    const onDeleteButtonClickHandler = (e: React.MouseEvent<SVGSVGElement>) => {
        dispatch(deleteNote({noteId}))
        e.stopPropagation()
    }

    const onColorChangeButtonClickHandler = (e: React.MouseEvent<SVGSVGElement>) => {
        setShowColorBar(!showColorBar)
        e.stopPropagation()
    }

    const str = `${createdAt}`;
    const localDate = new Date(str).toLocaleDateString('ru-RU')

    return (
        <div className={s.card} style={colorizedColor}
             onClick={() => edit(title, note_text, colorizedColor, color, noteId)}>
            <div className={s.title_date_space}>
                <h2 className={s.cardTitle}>{title}</h2>
            </div>
            <p className={s.text}>{cropText(note_text)}</p>
            <div className={s.cardAction}>
                <EditIcon height={27} width={27} fill={colorizedColor.color}
                          onClick={onColorChangeButtonClickHandler}/>
                <small style={{margin: '5px 0 0 0'}}>{localDate}</small>
                <DeleteIcon fill={colorizedColor.color}
                            onClick={onDeleteButtonClickHandler}/>
                <ColorizedBar noteId={noteId} showColorBar={showColorBar}
                              setShowColorBar={setShowColorBar} currentColor={color}/>
            </div>
        </div>
    )
}

export default Note;

