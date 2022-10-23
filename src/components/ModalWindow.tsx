import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import s from "../styles/Modal.module.css";
import colorizeNote from "../utils/colorizeNote";
import {useSelector} from "react-redux";
import {RootState} from "../bll/store";
import {ColorSamplesType} from "../api/notes-api";
import {colorizedColorType} from "./Note";
import Button from "./universalComponent/Button/Button";
import EditIcon from "../assets/images/EditIcon";
import ColorizedBar from "./Note/ColorizedBar";
import {useAppDispatch} from "../utils/hooks";
import {setAddNoteNodalShow, setEditNoteModalShow} from "../bll/slices/notesSlice";


export type ModalWindowType = 'edit' | 'create'
type ModalWindowPropsType = {
    titleNode: string
    textNode: string
    typeNode: ModalWindowType
    onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
    onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    onConfirm?: (id: string, title: string, note_text: string, showColor: ColorSamplesType) => void //cюда передавать цвет
    onDiscard?: () => void
    onCreatClickHandler?: (id: string, title: string, note_text: string, showColor: ColorSamplesType) => void //cюда передавать цвет
    colorNote: colorizedColorType
    modalId: string
    defaultColor?: boolean
    setDefaultColor?: (value: boolean) => void
    modalShow: boolean
}


const ModalWindowAlternative = ({titleNode, textNode, typeNode, onTitleChange, onTextChange, onConfirm,
                                    onDiscard, onCreatClickHandler, modalId, defaultColor,
                                    setDefaultColor, modalShow}: ModalWindowPropsType) => {

    const modalWindowRef = useRef<HTMLDivElement>(null)
    const modalWindowBackgroundRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()

    useEffect(() => {
        document.body.addEventListener('click', (e: any) => {
            if (e.path.includes(modalWindowBackgroundRef.current) && !e.path.includes(modalWindowRef.current) && modalShow) {
                console.log('click away')
                if (typeNode === 'edit'){
                    dispatch(setEditNoteModalShow({isModalShow: false}))
                } else {
                    onDiscard && onDiscard()
                }
            }
        })
        return function cleanup() {
            document.body.removeEventListener('click', () => {
                console.log('unmount modalWindowComponent')
            })
        }
    }, [dispatch, modalShow, onDiscard, typeNode])

    const currentCol = useSelector<RootState, string | undefined>(state => state.notes.notes.find(el => el._id === modalId)?.color)
    const colorizedColor = colorizeNote(currentCol)
    const [showColorBar, setShowColorBar] = useState(false)
    const [showColor, setShowColor] = useState('blue' as ColorSamplesType)
    const [cmdKeyPress, setCmdKeyPress] = useState(false)
    const colorizedColorAdd = colorizeNote(showColor)
    const defaultNote = colorizeNote('blue')

    const modalStyle = {
        marginBottom: '9%',
        marginLeft: '25%'
    }


    const onColorChangeButtonClickHandler = (e: React.MouseEvent<SVGSVGElement>) => {
        setShowColorBar(!showColorBar)
        e.stopPropagation()
    }
    const creatNoteHandler = () => {
        onCreatClickHandler ?
            onCreatClickHandler(modalId, titleNode, textNode, showColor)
            : ''
        dispatch(setAddNoteNodalShow({isModalShow: false}))
    }
    const editNoteHandler = () => {
        onConfirm ?
            onConfirm(modalId, titleNode, textNode, currentCol ? currentCol as ColorSamplesType : 'blue' as ColorSamplesType)
            : ''
        dispatch(setEditNoteModalShow({isModalShow: false}))
    }

    //HotKeys Block//
    function onKeyPressHandler<T extends React.KeyboardEvent = React.KeyboardEvent<HTMLInputElement>>(e: T, type: 'edit' | 'create') {
        if (e.key === 'Enter' && (e.ctrlKey)) {
            dispatch(setEditNoteModalShow({isModalShow: false}))
            type === 'edit' ? editNoteHandler() : creatNoteHandler()
        }
    }

    function onKeyDownHandler<T extends React.KeyboardEvent = React.KeyboardEvent<HTMLInputElement>>(e: T, type: 'edit' | 'create') {
        if (e.keyCode === 91 || e.keyCode === 93) {
            setCmdKeyPress(true)
        } else if (e.keyCode === 13 && cmdKeyPress) {
            setCmdKeyPress(false)
            dispatch(setEditNoteModalShow({isModalShow: false}))
            type === 'edit' ? editNoteHandler() : creatNoteHandler()

        } else if (e.keyCode === 27) {
            if (type === 'edit') {
                dispatch(setEditNoteModalShow({isModalShow: false}))
            } else {
                onDiscard && onDiscard()
            }
        }
    }

    function onKeyUpHandler<T extends React.KeyboardEvent = React.KeyboardEvent<HTMLInputElement>>(e: T) {
        if (e.keyCode === 91 || e.keyCode === 93) {
            setCmdKeyPress(false)
        }
    }


    if (typeNode === 'edit') {
        console.log('edit')
        return (
            <div className={s.modal} ref={modalWindowBackgroundRef}>
                <div className={s.modalBox} style={colorizedColor} ref={modalWindowRef}>
                    <div className={s.topArea}>
                        <input type="text" className={s.cardTitle} style={colorizedColor}
                               value={titleNode}
                               onChange={onTitleChange}
                               onKeyPress={(e) => onKeyPressHandler(e, 'edit')}
                               onKeyDown={(e) => onKeyDownHandler(e, 'edit')}
                               onKeyUp={onKeyUpHandler}
                               maxLength={30}
                        />

                        <textarea className={s.textTextArea}
                                  maxLength={2000}
                                  rows={15} value={textNode}
                                  style={colorizedColor}
                                  onChange={onTextChange}
                                  onKeyPress={(e) => onKeyPressHandler<React.KeyboardEvent<HTMLTextAreaElement>>(e, 'edit')}
                                  onKeyDown={(e) => onKeyDownHandler<React.KeyboardEvent<HTMLTextAreaElement>>(e, 'edit')}
                                  onKeyUp={onKeyUpHandler<React.KeyboardEvent<HTMLTextAreaElement>>}
                        />
                    </div>
                    <div className={s.modalAction}>
                        <Button title={'Cancel'}
                                color={'RED'}
                                callback={() => {
                                    dispatch(setEditNoteModalShow({isModalShow: false}))
                                }}
                        />
                        <EditIcon width={'2.5em'} height={'2.5em'} fill={colorizedColor.color}
                                  className={s.hoverStyle}
                                  onClick={onColorChangeButtonClickHandler}/>
                        <ColorizedBar modalStyle={modalStyle}
                                      setShowColor={setShowColor}
                                      noteId={modalId}
                                      showColorBar={showColorBar}
                                      setShowColorBar={setShowColorBar}
                                      typeNode={typeNode}
                                      setDefaultColor={setDefaultColor}
                                      currentColor={colorizedColor.color}/>
                        <Button title={'Save'}
                                color={'GREEN'}
                                callback={editNoteHandler}
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        console.log('new')
        return (
            <div className={s.modal} ref={modalWindowBackgroundRef}>
                <div className={s.modalBox} style={defaultColor ? defaultNote : colorizedColorAdd} ref={modalWindowRef}>
                    <div className={s.topArea}>
                        <input type="text" className={s.cardTitle}
                               style={defaultColor ? defaultNote : colorizedColorAdd}
                               placeholder={'Add new title'}
                               value={titleNode} onChange={onTitleChange}
                               maxLength={30}
                               onKeyPress={(e) => onKeyPressHandler(e, 'create')}
                               onKeyDown={(e) => onKeyDownHandler(e, 'create')}
                               onKeyUp={onKeyUpHandler}
                        />
                        <textarea className={s.textTextArea}
                                  style={defaultColor ? defaultNote : colorizedColorAdd}
                                  rows={15}
                                  maxLength={2000}
                                  value={textNode}
                                  placeholder={'Add text'}
                                  onChange={onTextChange}
                                  onKeyPress={(e) => onKeyPressHandler<React.KeyboardEvent<HTMLTextAreaElement>>(e, 'create')}
                                  onKeyDown={(e) => onKeyDownHandler<React.KeyboardEvent<HTMLTextAreaElement>>(e, 'create')}
                                  onKeyUp={onKeyUpHandler<React.KeyboardEvent<HTMLTextAreaElement>>}
                        />
                    </div>
                    <div className={s.modalAction}>
                        <Button title={'Cancel'}
                                color={'RED'}
                                callback={() => {
                                    onDiscard && onDiscard()
                                }}
                        />
                        <EditIcon width={'2.5em'} height={'2.5em'} fill={colorizedColor.color}
                                  className={s.hoverStyle}
                                  onClick={onColorChangeButtonClickHandler}/>
                        <ColorizedBar modalStyle={modalStyle}
                                      setShowColor={setShowColor}
                                      noteId={modalId}
                                      showColorBar={showColorBar}
                                      setShowColorBar={setShowColorBar}
                                      typeNode={typeNode}
                                      setDefaultColor={setDefaultColor}
                                      currentColor={colorizedColor.color}/>
                        <Button title={'Save'}
                                color={'GREEN'}
                                callback={creatNoteHandler}
                        />
                    </div>
                </div>
            </div>

        );
    }
};

export default ModalWindowAlternative;