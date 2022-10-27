import s from '../../styles/Note.module.css'
import EditIcon from "../../assets/images/EditIcon";
import DeleteIcon from "../../assets/images/DeleteIcon";
import colorizeNote from "../../utils/colorizeNote";
import {useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import {createNote, deleteNote, editNote, notesSlice} from "../../bll/slices/notesSlice";
import ColorizedBar from './ColorizedBar';
import React from 'react'
import {ColorSamplesType} from 'src/api/notes-api';
import {colorizedColorType} from "../Note";
import {cropText} from "../../utils/cropText";
import {useDrag, useDrop} from 'react-dnd';
import {ItemTypes} from 'src/utils/item';
import type {Identifier, XYCoord} from 'dnd-core';
import {PushPinIcon} from "../../assets/images/PushPin";
import {PushPinBlackIcon} from "../../assets/images/PushPinBlack";


export type NotePropsType = {
    index: number
    moveCard?: (dragID: string, hoverID: string) => void
    title?: string
    note_text?: string
    color: ColorSamplesType
    noteId: string
    pinned:boolean
    edit: (title: string, note_text: string, colorizedColor: colorizedColorType, color: ColorSamplesType, noteId: string) => void
    createdAt?: Date
    changePinnedHandler:(noteId:string, result:boolean)=> void
}

type DragItem = {
    index: number
    noteId: string
    type: string
}


const Note = ({
                  title = '',
                  note_text = '',
                  color,
                  pinned,
                  changePinnedHandler,
                  edit,
                  noteId,
                  createdAt,
                  index,
                  moveCard,
              }: NotePropsType) => {
    const dispatch = useAppDispatch()
    const colorizedColor = colorizeNote(color)

    const [showColorBar, setShowColorBar] = useState(false)

    const [changePushPin, setChangePushPin] = useState<boolean>(pinned);

    const changePushPinHandler = (e: React.MouseEvent<SVGSVGElement>) => {
        setChangePushPin(!changePushPin);
         const result=!changePushPin ? true : false;
        changePinnedHandler(noteId, result)
        e.stopPropagation()
    }

    const onDeleteButtonClickHandler = (e: React.MouseEvent<SVGSVGElement>) => {
        dispatch(deleteNote({noteId}))
        e.stopPropagation()
    }

    const onColorChangeButtonClickHandler = (e: React.MouseEvent<SVGSVGElement>) => {
        setShowColorBar(!showColorBar)
        e.stopPropagation()
    }

    const str = `${createdAt}`;
    const localDate = new Date(str).toLocaleDateString('ru-RU')


    //Drag and Drop logic

    const ref = useRef<HTMLDivElement>(null)
    const [{handlerId}, drop] = useDrop<DragItem,
        void,
        { handlerId: Identifier | null }>({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const dragID = item.noteId
            const hoverIndex = index
            const hoverID = noteId

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical and horizontal middles
            const hoverMiddleX =
                (hoverBoundingRect.right - hoverBoundingRect.left) / 2
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the left corner of hover rectangle
            const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left   //положение мыши на экране по оси X относительно левого верхнего угла прямоугольника
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top   //положение мыши на экране по оси Y относительно левого верхнего угла прямоугольника

            // Only perform the move when the mouse has crossed the border of
            // an imaginary rectangle in the center of the card 50% wide and 50% high of the card

            //Non-Dragging cases
            if (dragIndex !== hoverIndex && (hoverClientX < (hoverMiddleX * 0.5))) {
                return
            }
            if (dragIndex !== hoverIndex && (hoverClientX > (hoverMiddleX * 1.5))) {
                return
            }
            if (dragIndex !== hoverIndex && (hoverClientY < (hoverMiddleY * 0.5))) {
                return
            }
            if (dragIndex !== hoverIndex && (hoverClientY > (hoverMiddleY * 1.5))) {
                return
            }

            // Time to actually perform the action
            moveCard && moveCard(dragID, hoverID)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{isDragging}, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return {noteId, index}
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    drag(drop(ref))
    colorizedColor.opacity = isDragging ? 0 : 1
    return (
        <div className={s.card} style={colorizedColor} ref={ref} data-handler-id={handlerId}
             onClick={() => edit(title, note_text, colorizedColor, color, noteId)}>

            <div className={s.title_date_space}>

                <h2 className={s.cardTitle}>{title}</h2>
                {changePushPin ?
                    <PushPinBlackIcon height={30} width={30} fill={colorizedColor.color}
                                      onClick={changePushPinHandler}/>
                    : <PushPinIcon height={30} width={30} fill={colorizedColor.color} onClick={changePushPinHandler}/>}
            </div>
            <p className={s.text}>{cropText(note_text)}</p>
            <div className={s.cardAction}>
                <EditIcon height={27} width={27} fill={colorizedColor.color}
                          className={s.hoverStyle}
                          onClick={onColorChangeButtonClickHandler}/>
                <small style={{margin: '5px 0 0 0'}}>{localDate}</small>
                <DeleteIcon className={s.hoverStyle}
                            fill={colorizedColor.color}
                            onClick={onDeleteButtonClickHandler}/>
                <ColorizedBar
                    noteId={noteId} showColorBar={showColorBar}
                    setShowColorBar={setShowColorBar} currentColor={color}/>
            </div>
        </div>
    )
}

export default Note;

