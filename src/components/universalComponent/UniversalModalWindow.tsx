import Button from "src/components/universalComponent/Button/Button";
import s from "../../styles/UniversalModalWindow.module.css"
import React, {useRef, useState} from "react";
import colorizeNote from "src/utils/colorizeNote";
import {deleteNote, setEditNoteModalShow} from "src/bll/slices/notesSlice";
import {useAppDispatch, useAppSelector} from "src/utils/hooks";

export type UniversalModalWindowType = {
    title: string,
    noteId: string,
    isOpen: () => void

}

export const UniversalModalWindow = ({title, noteId, isOpen}: UniversalModalWindowType) => {
    const dispatch = useAppDispatch()
    const modalWindowRef = useRef<HTMLDivElement>(null)
    const modalWindowBackgroundRef = useRef<HTMLDivElement>(null)
    // const colorizedColorAdd = colorizeNote(showColor)
    // const defaultNote = colorizeNote('blue')

    const deleteNotesHandler = (e: React.MouseEvent<SVGSVGElement>) => {

        dispatch(deleteNote({noteId}))
        e.stopPropagation()
    }
    const cancelHandler = (e: React.MouseEvent<SVGSVGElement>) => {
        isOpen && isOpen()
        e.stopPropagation()
    }

    return (
        <div className={s.modalWindow} ref={modalWindowBackgroundRef}>
            <div className={s.modalBlock}>

                <div className={s.modalTitle}>
                    {title}
                </div>
                <div className={s.buttons}>
                    <Button title='Cancel' color='RED' callback={cancelHandler}/>
                    <Button title='Delete' color='GREEN' callback={deleteNotesHandler}/>
                </div>
                {/*<div className={s.modalBox} style={defaultColor ? defaultNote : colorizedColorAdd} ref={modalWindowRef}>*/}


            </div>
        </div>
        // </div>

    )

}
