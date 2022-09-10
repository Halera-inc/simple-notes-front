import React, {ChangeEvent, useRef, useState} from 'react';
import s from '../../styles/Sidebar.module.css'
import LoginIcon from "../../assets/images/LoginIcon";
import NotesIcon from "../../assets/images/NotesIcon";
import SettingIcon from "../../assets/images/SettingIcon";
import SunnyIcon from "../../assets/images/SunnyIcon";
import PlusIcon from "../../assets/images/PlusIcon";
import PencilIcon from "../../assets/images/PencilIcon";
import SidebarItem from "./SidebarItem";
import {useRouter} from "next/router";
import ModalWindow from "../ModalWindow";
import {useTheme} from "next-themes";
import MoonIcon from "src/assets/images/MoonIcon";
import {createNote} from "../../bll/slices/notesSlice";
import {useAppDispatch} from "../../utils/hooks";
import {setIsLoggedIn} from "../../bll/slices/authSlice";
import {signOut} from "next-auth/react";

const Sidebar = () => {

    const router = useRouter()
    const dispatch = useAppDispatch()

    const modalAddBtnRef = useRef<HTMLLabelElement>(null)
    const [newNoteTitle, setNewNoteTitle] = useState('')
    const [newNoteText, setNewNoteText] = useState('')

    const onAddNoteClickHandler = () => {
        modalAddBtnRef.current && modalAddBtnRef.current.click()
    }
    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewNoteTitle(e.currentTarget.value)
    }
    const onContentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewNoteText(e.currentTarget.value)
    }
    const onConfirmClickHandler = () => {  // todo need to fix with appAPI
        dispatch(createNote({title: newNoteTitle, note_text: newNoteText}))
        setNewNoteTitle('')
        setNewNoteText('')
    }
    const onDiscardClickHandler = () => {  // todo need to fix with appAPI
        alert('Cancel in Add mode') //need to fix
        setNewNoteTitle('')
        setNewNoteText('')
    }

    const {systemTheme, theme, setTheme} = useTheme();

    const currentTheme = theme === "system" ? systemTheme : theme;

    const onLogoutClickHandle = () => {
        signOut()
    }
    const {pathname} = useRouter();

    const pagesWithNavbar = ["/notes", "/settings"];
    const renderNavbar = pagesWithNavbar.includes(pathname);
    return renderNavbar ? (
        <div className={s.sidebarWrapper}>
            <label ref={modalAddBtnRef} htmlFor='my-modal-add-note'
                   className="btn modal-button hidden">open
                modal</label>
            <ModalWindow titleNode={newNoteTitle}
                         textNode={newNoteText}
                         colorNote={{}}
                         modalId={''}
                         typeNode={'create'}
                         onTitleChange={onTitleChangeHandler}
                         onTextChange={onContentChangeHandler}
                         onConfirm={onConfirmClickHandler}
                         onDiscard={onDiscardClickHandler}/>
            <div className={s.upBox}>
                <span className={s.whiteBg}>
                    <PencilIcon width={50} fill={'none'} stroke={'#5590C1'}/>
                </span>
            </div>
            <div className={s.middleBox}>
                <SidebarItem tooltipInfo={'Create note'}
                             link={'/notes'}
                             icon={<PlusIcon width={50}
                                             fill={'#5590C1'}
                                             onClick={onAddNoteClickHandler}/>}/>
                <SidebarItem tooltipInfo={'My notes'}
                             active={router.pathname === '/notes'}
                             link={'/notes'}
                             icon={<NotesIcon width={50} fill={'#5590C1'}/>}/>
                <SidebarItem tooltipInfo={'Settings'}
                             active={router.pathname === '/settings'}
                             link={'/settings'}
                             icon={<SettingIcon width={50} fill={'#5590C1'}/>}/>
            </div>
            <div className={s.bottomBox}>
                {currentTheme === 'dark' &&
                <SidebarItem tooltipInfo={'Light Side'}
                             icon={<SunnyIcon onClick={() => {
                                 setTheme('light')
                             }} width={50} fill={'#5590C1'}/>}/>}
                {currentTheme !== 'dark' &&
                <SidebarItem tooltipInfo={'Dark Side'}
                             icon={<MoonIcon onClick={() => {
                                 setTheme('dark')
                             }} width={50} fill={'#5590C1'}/>}/>
                }

                <SidebarItem tooltipInfo={'Log out'}
                             redActive={true}
                             link={'/#'}
                             icon={<LoginIcon width={50} fill={'#5590C1'}
                                              onClick={onLogoutClickHandle}/>}/>
            </div>
            <div className={'bg'}></div>
        </div>
    ) : null
};

export default Sidebar;
