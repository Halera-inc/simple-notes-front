import React from 'react'
import HeroIconsOutlineChevronDown from 'src/assets/images/HeroIconsOutlineChevronDown'
import HeroIconsOutlineChevronUp from 'src/assets/images/HeroIconsOutlineChevronUp'


import s from '../../styles/DropDown.module.css'

type DropDownPropsType = {
    isCollapsed: boolean
    setIsCollapsed: (status: boolean) => void
    dropItems: Array<string>
}

const DropDown: React.FC<DropDownPropsType> = ({isCollapsed, setIsCollapsed, dropItems}) => {

    const onDropDownClickHandler = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (

        <div className={s.container}>
            <label onClick={onDropDownClickHandler} tabIndex={0}
                   className={s.button}>
                {isCollapsed
                    ? <HeroIconsOutlineChevronUp width={'1.5em'} height={'1.5em'}/>
                    : <HeroIconsOutlineChevronDown width={'1.5em'} height={'1.5em'}/>}
            </label>
            <ul tabIndex={0} className={!isCollapsed ? s.dropMenuUl : s.dropMenuUlActive}>
                {dropItems.map((el, id) => <li key={id}><a className={s.dropMenuUlLi}>{el}</a></li>)}
            </ul>

        </div>
    );
};

export default DropDown;