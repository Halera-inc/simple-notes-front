import s from '../../styles/Note.module.css'
import EditIcon from "../../assets/images/EditIcon";
import DeleteIcon from "../../assets/images/DeleteIcon";
import colorizeNote from "../../utils/colorizeNote";
import {useRef, useState} from 'react';
import {useAppDispatch} from "../../utils/hooks";
import {deleteNote} from "../../bll/slices/notesSlice";
import ColorizedBar from './ColorizedBar';
import React from 'react'
import {ColorSamplesType} from 'src/api/notes-api';
import {colorizedColorType} from "../Note";
import {cropText} from "../../utils/cropText";
import {useDrag, useDrop} from 'react-dnd';
import {ItemTypes} from 'src/utils/item';
import type {Identifier, XYCoord} from 'dnd-core';

// type NotePropsType = {
//     title?: string
//     note_text?: string
//     color: ColorSamplesType
//     noteId: string
//     edit: (title: string, note_text: string, colorizedColor: colorizedColorType, color: ColorSamplesType, noteId: string) => void
//     createdAt?: Date
// }

export interface NoteProps {
    index: number
    moveCard?: (dragID: string, hoverID: string) => void
    title?: string
    note_text?: string
    color: ColorSamplesType
    noteId: string
    edit: (title: string, note_text: string, colorizedColor: colorizedColorType, color: ColorSamplesType, noteId: string) => void
    createdAt?: Date
}

interface DragItem {
    index: number
    noteId: string
    type: string
}



const Note = ({
                  title = '',
                  note_text = '',
                  color,
                  edit,
                  noteId,
                  createdAt,
                  index,
                  moveCard,
              }: NoteProps) => {
    const dispatch = useAppDispatch()
    const colorizedColor = colorizeNote(color)
    const [showColorBar, setShowColorBar] = useState(false)

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


    //DND block


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

            // console.log(item)

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleX =
                (hoverBoundingRect.right - hoverBoundingRect.left) / 2
            // console.log('hoverBoundingRect.right', hoverBoundingRect.right)
            // console.log('hoverBoundingRect.left', hoverBoundingRect.left)
            // console.log('hoverMiddleX', hoverMiddleX)

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the left
            const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left
            // console.log('(clientOffset as XYCoord).x', (clientOffset as XYCoord).x)
            // console.log('hoverBoundingRect.left', hoverBoundingRect.left)
            // console.log('hoverClientX', hoverClientX)
            // console.log('______________________________________')

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                return
            }

            // Time to actually perform the action
            console.log('*****************move card******************')

            // console.log('________FROM________')
            // console.log(dragIndex)
            // console.log('dragID ', dragID)
            // console.log('________TO________')
            // console.log(hoverIndex)
            // console.log('hoverID ', hoverID)
            moveCard && moveCard(dragID, hoverID)


            // moveCard(dragIndex, hoverIndex)

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

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))


    ///

    return (
        <div className={s.card} style={colorizedColor} ref={ref} data-handler-id={handlerId}
             onClick={() => edit(title, note_text, colorizedColor, color, noteId)}>
            <div className={s.title_date_space}>
                <h2 className={s.cardTitle}>{title}</h2>
            </div>
            <p className={s.text}>{cropText(note_text)}</p>
            <div className={s.cardAction}>
                <EditIcon height={27} width={27} fill={colorizedColor.color}
                          onClick={onColorChangeButtonClickHandler}/>
                <small style={{margin: '5px 0 0 0'}}>{localDate}</small>
                <DeleteIcon fill={colorizedColor.color}
                            onClick={onDeleteButtonClickHandler}/>
                <ColorizedBar noteId={noteId} showColorBar={showColorBar}
                              setShowColorBar={setShowColorBar} currentColor={color}/>
            </div>
        </div>
    )
}

export default Note;

