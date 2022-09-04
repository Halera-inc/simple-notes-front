import React, {ChangeEvent} from 'react';
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

const ModalWindow: React.FC<ModalWindowPropsType> = (props: ModalWindowPropsType) => {

    if (props.typeNode === 'edit') {
        return (
            <>
                <input type="checkbox" id='my-modal' className="modal-toggle"/>
                <div className="modal backdrop-blur-sm">
                    <div className={s.modalBox} style={props.colorNote}>
                        <div className={s.topArea}>
                            <h3 className={s.titleModal} style={props.colorNote}>Edit your note!</h3>
                            <input type="text" className={s.cardTitle} style={props.colorNote} value={props.titleNode}
                                   onChange={props.onTitleChange}/>
                            <textarea className={s.textTextArea}
                                      maxLength={450}
                                      rows={15} value={props.textNode}
                                      style={props.colorNote}
                                      onChange={props.onTextChange}/>
                        </div>
                        <div className={s.modalAction}>
                            <label htmlFor="my-modal" className={s.modalCancel} onClick={props.onConfirm}>Cancel</label>
                            <EditIcon width={'2.5em'} height={'2.5em'} fill={props.colorNote.color}/>
                            <label htmlFor="my-modal" className={s.modalSave} onClick={props.onDiscard}>Save</label>
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
                            {/*<h3 className={s.titleModal} style={props.colorNote}></h3>*/}
                            <input type="text" className={s.cardTitle} style={props.colorNote}
                                   placeholder={'Add new title'}
                                   value={props.titleNode} onChange={props.onTitleChange}/>
                            <textarea className={s.textTextArea}
                                      style={props.colorNote}
                                      rows={15}
                                      maxLength={450}
                                      value={props.textNode}
                                      placeholder={'Add text'}
                                      onChange={props.onTextChange}/>
                        </div>
                        <div className={s.modalAction}>
                            <label htmlFor='my-modal-add-note' className={s.modalSave}
                                   onClick={props.onConfirm}>Save</label>
                            <EditIcon width={'2.5em'} height={'2.5em'} fill={"#5590C1"}/>
                            <label htmlFor='my-modal-add-note' className={s.modalCancel}
                                   onClick={props.onDiscard}>Cancel</label>
                        </div>
                    </div>
                </div>
            </>
        )
    }

};

export default ModalWindow;