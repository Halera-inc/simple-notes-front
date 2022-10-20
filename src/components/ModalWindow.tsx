import React, {ChangeEvent, useRef, useState} from 'react';
import s from '../styles/Modal.module.css'
import EditIcon from "../assets/images/EditIcon";
import {colorizedColorType} from "./Note";
import ColorizedBar from "./Note/ColorizedBar";
import colorizeNote from "../utils/colorizeNote";
import {RootState} from "../bll/store";
import {useSelector} from "react-redux";
import Button from "./universalComponent/Button/Button";
import {ColorSamplesType} from "../api/notes-api";

export type ModalWindowType = 'edit' | 'create'
type ModalWindowPropsType = {
    titleNode: string
    textNode: string
    typeNode: ModalWindowType
    onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
    onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    onConfirm?: (id: string, title: string, note_text: string, showColor: ColorSamplesType) => void //cюда передавать цвет
    onCreatClickHandler?: (id: string, title: string, note_text: string, showColor: ColorSamplesType) => void //cюда передавать цвет
    onDiscard: () => void
    colorNote: colorizedColorType
    modalId: string
    defaultColor?: boolean
    setDefaultColor?: (value: boolean) => void
}

const ModalWindow: React.FC<ModalWindowPropsType> = (props: ModalWindowPropsType) => {


    const modalStyle = {
        marginBottom: '9%',
        marginLeft: '25%'
    }

    const [showColorBar, setShowColorBar] = useState(false)
    const [showColor, setShowColor] = useState('blue' as ColorSamplesType)
    const [cmdKeyPress, setCmdKeyPress] = useState(false)
    const currentCol = useSelector<RootState, string | undefined>(state => state.notes.notes.find(el => el._id === props.modalId)?.color)
    const colorizedColor = colorizeNote(currentCol)
    const modalSaveBtnRef = useRef<HTMLLabelElement>(null)
    const modalCancelBtnRef = useRef<HTMLLabelElement>(null)
    const colorizedColorAdd = colorizeNote(showColor)
    const defaultNote = colorizeNote('blue')

    const onColorChangeButtonClickHandler = (e: React.MouseEvent<SVGSVGElement>) => {
        setShowColorBar(!showColorBar)
        e.stopPropagation()
    }
    const creatNoteHandler = () => {
        props.onCreatClickHandler ?
            props.onCreatClickHandler(props.modalId, props.titleNode, props.textNode, showColor)
            : ''
    }

    const editNoteHandler = () => {
        props.onConfirm ?
            props.onConfirm(props.modalId, props.titleNode, props.textNode, currentCol ? currentCol as ColorSamplesType : 'blue' as ColorSamplesType)
            : ''
    }

    function onKeyPressHandler<T extends React.KeyboardEvent = React.KeyboardEvent<HTMLInputElement>>(e: T, type: 'edit' | 'create') {
        if (e.key === 'Enter' && (e.ctrlKey)) {
            modalSaveBtnRef.current && modalSaveBtnRef.current.click()
            type === 'edit' ? editNoteHandler() : creatNoteHandler()
        }
    }

    function onKeyDownHandler<T extends React.KeyboardEvent = React.KeyboardEvent<HTMLInputElement>>(e: T, type: 'edit' | 'create') {
        if (e.keyCode === 91 || e.keyCode === 93) {
            setCmdKeyPress(true)
        } else if (e.keyCode === 13 && cmdKeyPress) {
            setCmdKeyPress(false)
            modalSaveBtnRef.current && modalSaveBtnRef.current.click()
            type === 'edit' ? editNoteHandler() : creatNoteHandler()

        } else if (e.keyCode === 27) {
            modalCancelBtnRef.current && modalCancelBtnRef.current.click()
            props.onDiscard()
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
                <div className="modal  backdrop-blur-sm ">
                    <div className={s.modalBox} style={colorizedColor}>
                        <div className={s.topArea}>
                            <input type="text" className={s.cardTitle} style={colorizedColor}
                                   value={props.titleNode}
                                   onChange={props.onTitleChange}
                                   onKeyPress={(e) => onKeyPressHandler(e, 'edit')}
                                   onKeyDown={(e) => onKeyDownHandler(e, 'edit')}
                                   onKeyUp={onKeyUpHandler}
                                   maxLength={30}
                            />

                            <textarea className={s.textTextArea}
                                      maxLength={2000}
                                      rows={15} value={props.textNode}
                                      style={colorizedColor}
                                      onChange={props.onTextChange}
                                      onKeyPress={(e) => onKeyPressHandler<React.KeyboardEvent<HTMLTextAreaElement>>(e, 'edit')}
                                      onKeyDown={(e) => onKeyDownHandler<React.KeyboardEvent<HTMLTextAreaElement>>(e, 'edit')}
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
                                      className={s.hoverStyle}
                                      onClick={onColorChangeButtonClickHandler}/>
                            <ColorizedBar modalStyle={modalStyle}
                                          setShowColor={setShowColor}
                                          noteId={props.modalId}
                                          showColorBar={showColorBar}
                                          setShowColorBar={setShowColorBar}
                                          typeNode={props.typeNode}
                                          setDefaultColor={props.setDefaultColor}
                                          currentColor={colorizedColor.color}/>
                            <label ref={modalSaveBtnRef} htmlFor="my-modal" className={s.modalSave}>
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
                    <div className={s.modalBox} style={props.defaultColor ? defaultNote : colorizedColorAdd}>
                        <div className={s.topArea}>
                            <input type="text" className={s.cardTitle}
                                   style={props.defaultColor ? defaultNote : colorizedColorAdd}
                                   placeholder={'Add new title'}
                                   value={props.titleNode} onChange={props.onTitleChange}
                                   maxLength={30}
                                   onKeyPress={(e) => onKeyPressHandler(e, 'create')}
                                   onKeyDown={(e) => onKeyDownHandler(e, 'create')}
                                   onKeyUp={onKeyUpHandler}
                            />
                            <textarea className={s.textTextArea}
                                      style={props.defaultColor ? defaultNote : colorizedColorAdd}
                                      rows={15}
                                      maxLength={2000}
                                      value={props.textNode}
                                      placeholder={'Add text'}
                                      onChange={props.onTextChange}
                                      onKeyPress={(e) => onKeyPressHandler<React.KeyboardEvent<HTMLTextAreaElement>>(e, 'create')}
                                      onKeyDown={(e) => onKeyDownHandler<React.KeyboardEvent<HTMLTextAreaElement>>(e, 'create')}
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
                            <EditIcon width={'2.5em'} height={'2.5em'}
                                      className={s.hoverStyle}
                                      fill={props.defaultColor ? defaultNote.color : colorizedColorAdd.color}
                                      onClick={onColorChangeButtonClickHandler}/>
                            <ColorizedBar modalStyle={modalStyle}
                                          noteId={props.modalId}
                                          typeNode={props.typeNode}
                                          setShowColor={setShowColor}
                                          showColorBar={showColorBar}
                                          setShowColorBar={setShowColorBar}
                                          setDefaultColor={props.setDefaultColor}
                                          currentColor={colorizedColor.color}/>

                            <label ref={modalSaveBtnRef} htmlFor="my-modal-add-note" className={s.modalSave}>
                                <Button title={'Save'}
                                        color={'GREEN'}
                                        htmlFor={'my-modal-add-note'}
                                        callback={creatNoteHandler}
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
