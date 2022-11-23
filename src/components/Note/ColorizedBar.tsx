import React from 'react';
import {ColorSamplesType} from 'src/api/notes-api';
import {editNote} from 'src/bll/slices/notesSlice';
import colorizeNote from 'src/utils/colorizeNote';
import {useAppDispatch} from 'src/utils/hooks';
import {ModalWindowType} from "../ModalWindow";

type ColorizedBarPropsType = {
    noteId: string
    showColorBar: boolean
    setShowColorBar: (newStatus: boolean) => void
    currentColor: string
    modalStyle?: { marginBottom: string, marginLeft: string }
    setShowColor?: (color: ColorSamplesType) => void
    setNewColor?: (color: ColorSamplesType) => void
    typeNode?: ModalWindowType
    setDefaultColor?: (value: boolean) => void
}

const ColorizedBar: React.FC<ColorizedBarPropsType> = (
    {
        noteId,
        showColorBar,
        setShowColorBar,
        currentColor,
        modalStyle,
        setShowColor,
        typeNode,
        setDefaultColor,
    }) => {

    const colorSamples: ColorSamplesType[] = ["blue", "green", "violet", "mustard"]
    const dispatch = useAppDispatch()

    const onColorClick = (color: ColorSamplesType) => {
        if (typeNode === 'create' ) {
            setShowColor ? setShowColor(color) : "blur"
            setDefaultColor ? setDefaultColor(false):null
            setShowColorBar(!showColorBar)
        }
        if (typeNode === 'edit' || color !== currentColor) {
            dispatch(editNote({id: noteId, color: color}))
            setShowColorBar(!showColorBar)
        }
    }

    return (
        <div style={modalStyle}
             className={`cursor-pointer absolute flex duration-300 ${showColorBar ? 'bottom-[40px] sd:bottom-[60px] sd:left-[5px] ' : 'opacity-0 bottom-[30px]'}`}
             onClick={(event) => {
                 event.stopPropagation()
             }}>
            {colorSamples.map((c, k) => {
                const divClassName = `bg-[${colorizeNote(c).color}] hover:scale-125 transition w-[30px] h-[30px] border-[1px] mr-[10px]`
                return (
                    <div key={k}>
                        <div className={divClassName} onClick={() => onColorClick(c)}></div>
                    </div>
                )
            })}

            {/*Далее цвета не сделаны через map, т.к. в первом случае при применении данный цвет меняется на противоположный согласно настройкам темы,*/}
            {/*во втором случае, для отображения цвета использован код цвета "backgroundColor", а не "color"*/}

            <div className='bg-[#212121] w-[30px] h-[30px] border-[1px] mr-[10px] hover:scale-125 transition'
                 onClick={() => onColorClick('dark')}></div>
            <div className='bg-[#E5E5E5] w-[30px] h-[30px] border-[1px] mr-[10px] hover:scale-125 transition'
                 onClick={() => onColorClick('default')}></div>
            {/*<div className={`absolute flex bottom-[40px]`}>*/}
            {/*    <div className='bg-[#5590C1] w-[30px] h-[30px] mr-[10px] border-[1px]'></div>*/}
            {/*    <div className='bg-[#5E9C80] w-[30px] h-[30px] mr-[10px] border-[1px]'></div>*/}
            {/*    <div className='bg-[#866FA7] w-[30px] h-[30px] mr-[10px] border-[1px]'></div>*/}
            {/*    <div className='bg-[#C6B05D] w-[30px] h-[30px] mr-[10px] border-[1px]'></div>*/}
            {/*    <div className='bg-[#212121] w-[30px] h-[30px] mr-[10px] border-[1px]'></div>*/}
            {/*</div>*/}
        </div>
    );
};

export default ColorizedBar