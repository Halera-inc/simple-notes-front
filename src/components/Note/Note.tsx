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

type NotePropsType = {
    title?: string
    note_text?: string
    color: ColorSamplesType
    noteId: string
    edit: (title: string, note_text: string, colorizedColor: colorizedColorType, color: ColorSamplesType, noteId: string) => void
}

const Note = ({title = '', note_text = '', color, edit, noteId}: NotePropsType) => {
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


    return (
        <>
            <div className={s.card} style={colorizedColor}
                 onClick={() => edit(title, note_text, colorizedColor, color, noteId)}>
                <h2 className={s.cardTitle}>{title}</h2>
                <p className={s.text}>{note_text}</p>
                <div className={s.cardAction}>
                    <EditIcon height={27} width={27} fill={colorizedColor.color}
                              onClick={onColorChangeButtonClickHandler}/>
                    <DeleteIcon fill={colorizedColor.color} onClick={onDeleteButtonClickHandler}/>
                    <ColorizedBar noteId={noteId} showColorBar={showColorBar} setShowColorBar={setShowColorBar}
                                  currentColor={color}/>
                </div>
            </div>
        </>
    )
}

export default Note;

