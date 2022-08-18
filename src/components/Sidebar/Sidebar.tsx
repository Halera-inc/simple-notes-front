import React from 'react';
import s from './Sidebar.module.css';
import SettingIcon from "../../assets/images/SettingIcon";
import LoginIcon from "../../assets/images/LoginIcon";
import MenuIcon from "../../assets/images/MenuIcon";
import UserIcon from "../../assets/images/UserIcon";
import PencilAltIcon from "../../assets/images/PencilAltIcon";

export const Sidebar = (): JSX.Element => {
    return (
        <div className={s.sidebar_wrapper}>
            <div className={s.icons_wrapper}>
                <div className={s.addNote_icon}>
                    <PencilAltIcon/>
                </div>
                <div className={s.interface_icons}>
                    <MenuIcon/>
                    <SettingIcon/>
                    <UserIcon/>
                    <LoginIcon/>
                </div>
                <div className={s.copyright_text}>
                    © 2022<br/>
                    Halera dev.
                </div>
            </div>
        </div>
    );
};
