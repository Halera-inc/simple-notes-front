import React from 'react';
import s from '../../styles/Sidebar.module.css'
import LoginIcon from "../../assets/images/LoginIcon";
import NotesIcon from "../../assets/images/NotesIcon";
import SettingIcon from "../../assets/images/SettingIcon";
import SunnyIcon from "../../assets/images/SunnyIcon";
import PlusIcon from "../../assets/images/PlusIcon";
import PencilIcon from "../../assets/images/PencilIcon";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
    return (
        <div className={s.sidebarWrapper}>
            <div className={s.upBox}>
                <span className={s.whiteBg}>
                    <PencilIcon width={50} fill={'none'} stroke={'#5590C1'}/>
                </span>
            </div>
            <div className={s.middleBox}>
                <SidebarItem icon={<PlusIcon width={50} fill={'#5590C1'}/>}/>
                <SidebarItem icon={<NotesIcon width={50} fill={'#5590C1'}/>}/>
                <SidebarItem icon={<SettingIcon width={50} fill={'#5590C1'}/>}/>
            </div>
            <div className={s.bottomBox}>
                <SidebarItem icon={<SunnyIcon width={50} fill={'#5590C1'}/>}/>
                <SidebarItem icon={<LoginIcon width={50} fill={'#5590C1'}/>}/>
            </div>
            <div className={'bg'}></div>
        </div>
    );
};

export default Sidebar;
