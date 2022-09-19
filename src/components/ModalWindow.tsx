import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import s from '../styles/Modal.module.css'
import EditIcon from "../assets/images/EditIcon";
import {colorizedColorType} from "./Note";
import ColorizedBar from "./Note/ColorizedBar";
import colorizeNote from "../utils/colorizeNote";
import {RootState} from "../bll/store";
import {useSelector} from "react-redux";
import Button from "./universalComponent/Button/Button";

type ModalWindowType = 'edit' | 'create'
type ModalWindowPropsType = {
    titleNode: string
    textNode: string
    typeNode: ModalWindowType
    onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
    onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    onConfirm: (id: string, title: string, note_text: string) => void
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
    const [showColor, setShowColor] = useState('blue')

    const modalCloseBtnRef = useRef<HTMLLabelElement>(null)
    const currentCol = useSelector<RootState, string | undefined>(state => state.notes.notes.find(el => el._id === props.modalId)?.color)
    const colorizedColor = colorizeNote(currentCol)
    const colorizedColorAdd = colorizeNote(showColor)

    const onColorChangeButtonClickHandler = (e: React.MouseEvent<SVGSVGElement>) => {
        setShowColorBar(!showColorBar)
        e.stopPropagation()
    }
    const editNoteHandler = () => {
        props.onConfirm(props.modalId, props.titleNode, props.textNode)

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.ctrlKey || e.key === 'Meta') && e.key === "Enter") {
            editNoteHandler()
            modalCloseBtnRef.current && modalCloseBtnRef.current.click()
        }
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
                                      onChange={props.onTextChange}
                                      onKeyDown={onKeyPressHandler}
                            />
                        </div>
                        <div className={s.modalAction}>
                            <Button title={'Cancel'}
                                    htmlFor={'my-modal'}
                                    color={'RED'}
                                    callback={() => props.onDiscard()}/>
                            <EditIcon width={'2.5em'} height={'2.5em'} fill={colorizedColor.color}
                                      onClick={onColorChangeButtonClickHandler}/>
                            <ColorizedBar modalStyle={modalStyle}
                                          setShowColor={setShowColor}
                                          noteId={props.modalId}
                                          showColorBar={showColorBar}
                                          setShowColorBar={setShowColorBar}
                                          currentColor={colorizedColor.color}/>
                            <label ref={modalCloseBtnRef} htmlFor="my-modal" className={s.modalSave}>
                                <Button title={'Save'}
                                        htmlFor={'my-modal'}
                                        color={'GREEN'}
                                        callback={editNoteHandler}
                                />
                            </label>
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
                                      maxLength={2000}
                                      value={props.textNode}
                                      placeholder={'Add text'}
                                      onChange={props.onTextChange}/>
                        </div>
                        <div className={s.modalAction}>
                            <Button title={'Cancel'}
                                    color={'RED'}
                                    htmlFor={'my-modal-add-note'}
                                    callback={() => props.onDiscard()}/>
                            <EditIcon width={'2.5em'} height={'2.5em'} fill={colorizedColorAdd.color}
                                      onClick={onColorChangeButtonClickHandler}/>
                            <ColorizedBar modalStyle={modalStyle}
                                          noteId={props.modalId}
                                          setShowColor={setShowColor}
                                          showColorBar={showColorBar}
                                          setShowColorBar={setShowColorBar}
                                          currentColor={colorizedColor.color}/>
                            <Button title={'Save'}
                                    color={'GREEN'}
                                    htmlFor={'my-modal-add-note'}
                                    callback={editNoteHandler}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }

};

export default ModalWindow;
