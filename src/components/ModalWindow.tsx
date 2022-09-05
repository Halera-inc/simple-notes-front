import React, {ChangeEvent, useState} from 'react';
import s from '../styles/Modal.module.css'
import EditIcon from "../assets/images/EditIcon";
import {colorizedColorType} from "./Note";
import ColorizedBar from "./Note/ColorizedBar";
import colorizeNote from "../utils/colorizeNote";
import {RootState} from "../bll/store";
import {useSelector} from "react-redux";

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
    modalId: string

}

const ModalWindow: React.FC<ModalWindowPropsType> = (props: ModalWindowPropsType) => {
    const modalStyle = {
        marginBottom: '9%',
        marginLeft: '25%'
    }
    const [showColorBar, setShowColorBar] = useState(false)
    const currentCol = useSelector<RootState, string | undefined>(state => state.notes.notes.find(el => el._id === props.modalId)?.color)
    const colorizedColor = colorizeNote(currentCol)


    const onColorChangeButtonClickHandler = (e: React.MouseEvent<SVGSVGElement>) => {
        setShowColorBar(!showColorBar)
        e.stopPropagation()
    }

    if (props.typeNode === 'edit') {
        return (
            <>
                <input type="checkbox" id='my-modal' className="modal-toggle"/>
                <div className="modal backdrop-blur-sm">
                    <div className={s.modalBox} style={colorizedColor}>
                        <div className={s.topArea}>
                            <input type="text" className={s.cardTitle} style={colorizedColor} value={props.titleNode}
                                   onChange={props.onTitleChange}/>
                            <textarea className={s.textTextArea}
                                      maxLength={2000}
                                      rows={15} value={props.textNode}
                                      style={colorizedColor}
                                      onChange={props.onTextChange}/>
                        </div>
                        <div className={s.modalAction}>
                            <label htmlFor="my-modal" className={s.modalCancel} onClick={props.onConfirm}>Cancel</label>
                            <EditIcon width={'2.5em'} height={'2.5em'} fill={colorizedColor.color}
                                      onClick={onColorChangeButtonClickHandler}/>
                            <ColorizedBar modalStyle={modalStyle}
                                          noteId={props.modalId}
                                          showColorBar={showColorBar}
                                          setShowColorBar={setShowColorBar}
                                          currentColor={colorizedColor.color}/>
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
                    <div className={s.modalBox}>
                        <div className={s.topArea}>
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
                            <EditIcon className={'cursor-pointer'} width={'2.5em'} height={'2.5em'} fill={"#5590C1"}/>
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