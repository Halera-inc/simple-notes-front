import React, {ChangeEvent, useState} from 'react';
import s from '../styles/Modal.module.css'
import EditIcon from "../assets/images/EditIcon";
import {colorizedColorType} from "./Note";

type ModalWindowType = 'edit' | 'create'
type ModalWindowPropsType = {
    titleNode: string
    textNode: string
    typeNode: ModalWindowType
    onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
    onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    onConfirm: () => void
    onDiscard: () => void
    colorNote: colorizedColorType
}

const ModalWindow: React.FC<ModalWindowPropsType> = ({
                                                         typeNode, titleNode, textNode, onTitleChange,
                                                         onTextChange, onConfirm, onDiscard,
                                                         colorNote
                                                     }) => {

    if (typeNode === 'edit') {
        return (
            <>
                <input type="checkbox" id='my-modal' className="modal-toggle"/>
                <div className="modal backdrop-blur-sm">
                    <div className={s.modalBox} style={colorNote}>
                        <div className={s.topArea}>
                            <h3 className={s.titleModal} style={colorNote}>Edit your note!</h3>
                            <input type="text" className={s.cardTitle} style={colorNote} value={titleNode}
                                   onChange={onTitleChange}/>
                            <textarea className={s.textTextArea}
                                      maxLength={450}
                                      rows={15} value={textNode}
                                      style={colorNote}
                                      onChange={onTextChange}/>
                        </div>
                        <div className={s.modalAction}>
                            <label htmlFor="my-modal" className={s.modalCancel} onClick={onConfirm}>Cancel</label>
                            <EditIcon width={'2.5em'} height={'2.5em'} fill={colorNote.color}/>
                            <label htmlFor="my-modal" className={s.modalSave} onClick={onDiscard}>Save</label>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <input type="checkbox" id='my-modal-add-note' className="modal-toggle"/>
                <div className="modal backdrop-blur-sm">
                    <div className={s.modalBox} >
                        <div className={s.topArea}>
                            <h3 className={s.titleModal} style={colorNote}>Create new note!</h3>
                            <input type="text" className={s.cardTitle} style={colorNote}
                                   placeholder={'Add new title here...'}
                                   value={titleNode} onChange={onTitleChange}/>
                            <textarea className={s.textTextArea}
                                      style={colorNote}
                                      rows={15}
                                      maxLength={450}
                                      value={textNode}
                                      placeholder={'Add note content here...'}
                                      onChange={onTextChange}/>
                        </div>
                        <div className={s.modalAction}>
                            <label htmlFor='my-modal-add-note' className={s.modalSave}
                                   onClick={onConfirm}>Save</label>
                            <EditIcon width={'2.5em'} height={'2.5em'} fill={"#5590C1"}/>
                            <label htmlFor='my-modal-add-note' className={s.modalCancel}
                                   onClick={onDiscard}>Cancel</label>
                        </div>
                    </div>
                </div>
            </>
        )
    }

};

export default ModalWindow;