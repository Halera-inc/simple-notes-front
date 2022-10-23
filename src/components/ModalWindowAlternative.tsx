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
import {setModalShow} from "../bll/slices/notesSlice";


export type ModalWindowType = 'edit' | 'create'
type ModalWindowPropsType = {
    titleNode: string
    textNode: string
    typeNode: ModalWindowType
    onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
    onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    onConfirm?: (id: string, title: string, note_text: string, showColor: ColorSamplesType) => void //cюда передавать цвет
    onCreatClickHandler?: (id: string, title: string, note_text: string, showColor: ColorSamplesType) => void //cюда передавать цвет
    colorNote: colorizedColorType
    modalId: string
    defaultColor?: boolean
    setDefaultColor?: (value: boolean) => void
    modalShow: boolean
}


const ModalWindowAlternative: React.FC<ModalWindowPropsType> = (props: ModalWindowPropsType) => {

    const modalWindowRef = useRef<HTMLDivElement>(null)
    const modalWindowBackgroundRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()

    useEffect(() => {
        document.body.addEventListener('click', (e: any) => {
            if (e.path.includes(modalWindowBackgroundRef.current) && !e.path.includes(modalWindowRef.current) && props.modalShow) {
                console.log('click away')
                dispatch(setModalShow({isModalShow: false}))
            }
        })
        return function cleanup() {
            document.body.removeEventListener('click', () => {
                console.log('unmount modalWindowComponent')
            })
        }
    }, [dispatch])

    const currentCol = useSelector<RootState, string | undefined>(state => state.notes.notes.find(el => el._id === props.modalId)?.color)
    const colorizedColor = colorizeNote(currentCol)
    const [showColorBar, setShowColorBar] = useState(false)
    const [showColor, setShowColor] = useState('blue' as ColorSamplesType)
    const [cmdKeyPress, setCmdKeyPress] = useState(false)

    const modalStyle = {
        marginBottom: '9%',
        marginLeft: '25%'
    }


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

    //HotKeys Block//
    function onKeyPressHandler<T extends React.KeyboardEvent = React.KeyboardEvent<HTMLInputElement>>(e: T, type: 'edit' | 'create') {
        if (e.key === 'Enter' && (e.ctrlKey)) {
            dispatch(setModalShow({isModalShow: false}))
            type === 'edit' ? editNoteHandler() : creatNoteHandler()
        }
    }

    function onKeyDownHandler<T extends React.KeyboardEvent = React.KeyboardEvent<HTMLInputElement>>(e: T, type: 'edit' | 'create') {
        if (e.keyCode === 91 || e.keyCode === 93) {
            setCmdKeyPress(true)
        } else if (e.keyCode === 13 && cmdKeyPress) {
            setCmdKeyPress(false)
            dispatch(setModalShow({isModalShow: false}))
            type === 'edit' ? editNoteHandler() : creatNoteHandler()

        } else if (e.keyCode === 27) {
            dispatch(setModalShow({isModalShow: false}))
        }
    }

    function onKeyUpHandler<T extends React.KeyboardEvent = React.KeyboardEvent<HTMLInputElement>>(e: T) {
        if (e.keyCode === 91 || e.keyCode === 93) {
            setCmdKeyPress(false)
        }
    }


    return (
        <div className={s.modal} ref={modalWindowBackgroundRef}>
            <div className={s.modalBox} style={colorizedColor} ref={modalWindowRef}>
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
                    <Button title={'Cancel'}
                            color={'RED'}
                            callback={() => {dispatch(setModalShow({isModalShow: false}))}}
                    />
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
                    <Button title={'Save'}
                            color={'GREEN'}
                            callback={editNoteHandler}
                    />
                </div>
            </div>
        </div>

    );
};

export default ModalWindowAlternative;