import Button from "src/components/universalComponent/Button/Button";
import s from "../../styles/UniversalModalWindow.module.css"
import React, {useRef, useState} from "react";
import {deleteNote, setUniversalModal} from "src/bll/slices/notesSlice";
import {useAppDispatch} from "src/utils/hooks";

export type UniversalModalWindowType = {
    title: string,
    noteId: string


}

export const UniversalModalWindow = ({title, noteId}: UniversalModalWindowType) => {
    const dispatch = useAppDispatch()
    const modalWindowBackgroundRef = useRef<HTMLDivElement>(null)


    const deleteNotesHandler = (e: React.MouseEvent<SVGSVGElement>) => {
        dispatch(deleteNote({noteId}))
        dispatch(setUniversalModal({isUniversalModalShow: false}))
        e.stopPropagation()
    }
    const cancelHandler = (e: React.MouseEvent<SVGSVGElement>) => {
        dispatch(setUniversalModal({isUniversalModalShow: false}))
        e.stopPropagation()
    }
    console.log(UniversalModalWindow, 'UniversalModalWindow')
    return (
        <div className={s.modalWindow} ref={modalWindowBackgroundRef}>
            <div className={s.modalBlock}>

                <div className={s.modalTitle}>
                    {title}
                </div>
                <div className={s.buttons}>
                    <Button title='Cancel'  color='GREEN' callback={cancelHandler}/>
                    <Button title='Delete' color='RED'  callback={deleteNotesHandler}/>
                </div>


            </div>
        </div>
        // </div>

    )

}
