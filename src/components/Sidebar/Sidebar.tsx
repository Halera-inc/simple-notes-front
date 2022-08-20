import React from 'react';
import s from './Sidebar.module.css';
import LoginIcon from "../../assets/images/LoginIcon";
import {PlusIcon} from "../../assets/images/PlusIcon";
import {SunnyIcon} from "../../assets/images/SunnyIcon";
import {MenuIcon} from "../../assets/images/MenuIcon";
import {SettingIcon} from "../../assets/images/SettingIcon";
import {PencilIcon} from "../../assets/images/PencilIcon";

export const Sidebar = (): JSX.Element => {
    return (
        <div className={s.sidebar_wrapper}>
            <div className={s.addNote_icon}>
                <PencilIcon width={"5em"} height={"5em"}/>
            </div>
            <div className={s.interface_icons}>
                <PlusIcon/>
                <MenuIcon/>
                <SettingIcon/>
            </div>
            <div className={s.login_block}>
                <SunnyIcon/>
                <LoginIcon/>
            </div>
            <div className={'bg'}></div>
        </div>
    );
};
