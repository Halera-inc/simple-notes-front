import React, {ChangeEvent, useRef, useState} from 'react';
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
    const [cmdKeyPress, setCmdKeyPress] = useState(false)
    const currentCol = useSelector<RootState, string | undefined>(state => state.notes.notes.find(el => el._id === props.modalId)?.color)
    const colorizedColor = colorizeNote(currentCol)
    const modalSaveBtnRef = useRef<HTMLLabelElement>(null)
    const modalCancelBtnRef = useRef<HTMLLabelElement>(null)

    const onColorChangeButtonClickHandler = (e: React.MouseEvent<SVGSVGElement>) => {
        setShowColorBar(!showColorBar)
        e.stopPropagation()
    }

    const saveRequireHandler = () => {
        props.onConfirm(props.modalId, props.titleNode, props.textNode)
        modalSaveBtnRef.current && modalSaveBtnRef.current.click()
    }

    function onKeyPressHandler<T extends React.KeyboardEvent = React.KeyboardEvent<HTMLInputElement>>(e: T) {
        if (e.key === 'Enter' && (e.ctrlKey)) {
            saveRequireHandler()
        }
    }

    function onKeyDownHandler<T extends React.KeyboardEvent = React.KeyboardEvent<HTMLInputElement>>(e: T) {
        if (e.keyCode === 91 || e.keyCode === 93) {
            setCmdKeyPress(true)
        } else if (e.keyCode === 13 && cmdKeyPress) {
            saveRequireHandler()
        } else if (e.keyCode === 27) {
            modalCancelBtnRef.current && modalCancelBtnRef.current.click()
        }
    }

    function onKeyUpHandler<T extends React.KeyboardEvent = React.KeyboardEvent<HTMLInputElement>>(e: T) {
        if (e.keyCode === 91 || e.keyCode === 93) {
            setCmdKeyPress(false)
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
                                   onChange={props.onTitleChange}
                                   onKeyPress={onKeyPressHandler}
                                   onKeyDown={onKeyDownHandler}
                                   onKeyUp={onKeyUpHandler}
                            />
                            <textarea className={s.textTextArea}
                                      maxLength={2000}
                                      rows={15} value={props.textNode}
                                      style={colorizedColor}
                                      onChange={props.onTextChange}
                                      onKeyPress={onKeyPressHandler<React.KeyboardEvent<HTMLTextAreaElement>>}
                                      onKeyDown={onKeyDownHandler<React.KeyboardEvent<HTMLTextAreaElement>>}
                                      onKeyUp={onKeyUpHandler<React.KeyboardEvent<HTMLTextAreaElement>>}
                            />
                        </div>
                        <div className={s.modalAction}>
                            <label ref={modalCancelBtnRef} htmlFor="my-modal" className={s.modalSave}>
                                <Button title={'Cancel'}
                                        htmlFor={'my-modal'}
                                        color={'RED'}
                                        callback={() => props.onDiscard()}
                                />
                            </label>
                            <EditIcon width={'2.5em'} height={'2.5em'} fill={colorizedColor.color}
                                      onClick={onColorChangeButtonClickHandler}/>
                            <ColorizedBar modalStyle={modalStyle}
                                          noteId={props.modalId}
                                          showColorBar={showColorBar}
                                          setShowColorBar={setShowColorBar}
                                          currentColor={colorizedColor.color}/>
                            <label ref={modalSaveBtnRef} htmlFor="my-modal" className={s.modalSave}>
                                <Button title={'Save'}
                                        htmlFor={'my-modal'}
                                        color={'GREEN'}
                                        callback={() => props.onConfirm(props.modalId, props.titleNode, props.textNode)}
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
                                   value={props.titleNode} onChange={props.onTitleChange}
                                   onKeyPress={onKeyPressHandler}
                                   onKeyDown={onKeyDownHandler}
                                   onKeyUp={onKeyUpHandler}
                            />
                            <textarea className={s.textTextArea}
                                      style={props.colorNote}
                                      rows={15}
                                      maxLength={450}
                                      value={props.textNode}
                                      placeholder={'Add text'}
                                      onChange={props.onTextChange}
                                      onKeyPress={onKeyPressHandler<React.KeyboardEvent<HTMLTextAreaElement>>}
                                      onKeyDown={onKeyDownHandler<React.KeyboardEvent<HTMLTextAreaElement>>}
                                      onKeyUp={onKeyUpHandler<React.KeyboardEvent<HTMLTextAreaElement>>}
                            />
                        </div>
                        <div className={s.modalAction}>
                            <label ref={modalCancelBtnRef} htmlFor="my-modal-add-note" className={s.modalSave}>
                                <Button title={'Cancel'}
                                        color={'RED'}
                                        htmlFor={'my-modal-add-note'}
                                        callback={() => props.onDiscard()}
                                />
                            </label>
                            <label ref={modalSaveBtnRef} htmlFor="my-modal-add-note" className={s.modalSave}>
                                <Button title={'Save'}
                                        color={'GREEN'}
                                        htmlFor={'my-modal-add-note'}
                                        callback={() => props.onConfirm(props.modalId, props.titleNode, props.textNode)}
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </>
        )
    }

};

export default ModalWindow;
