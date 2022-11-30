import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
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
import {createNote, setAddNoteNodalShow} from "../../bll/slices/notesSlice";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import {signOut} from "next-auth/react";
import {ColorSamplesType} from "../../api/notes-api";

const Sidebar = () => {

    const router = useRouter()
    const dispatch = useAppDispatch()

    const modalAddBtnRef = useRef<HTMLLabelElement>(null)
    const [newNoteTitle, setNewNoteTitle] = useState('')
    const [newNoteText, setNewNoteText] = useState('')
    const [defaultColor, setDefaultColor] = useState(false)
    const addMoteModalShow = useAppSelector(state => state.notes.addNoteNodalShow)


    const onAddNoteClickHandler = () => {
        dispatch(setAddNoteNodalShow({isModalShow: true}))
    }
    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewNoteTitle(e.currentTarget.value)
    }
    const onContentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewNoteText(e.currentTarget.value)
    }

    const onCreatClickHandler = (id: string, title: string, note_text: string, showColor: ColorSamplesType) => {  // todo need to fix with appAPI
        dispatch(createNote({title: title, note_text: note_text, color: showColor})) //сюда нужно передать цвет
        dispatch(setAddNoteNodalShow({isModalShow: false}))
        setNewNoteTitle('')
        setNewNoteText('')
        setDefaultColor(true)
    }


    const onDiscardClickHandler = () => {  // todo need to fix with appAPI
        setNewNoteTitle('')
        setNewNoteText('')
        dispatch(setAddNoteNodalShow({isModalShow: false}))
    }

    const {systemTheme, theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    const RenderChangeThemeIcon = () => {
        if (!mounted) return null;
        const currentTheme = theme === "system" ? systemTheme : theme;
        if (currentTheme === 'dark') {
            return (
                <SidebarItem tooltipInfo={'Light Side'}
                             icon={<SunnyIcon onClick={() => {
                                 setTheme('light')
                             }} width={50} fill={'#ffffff'}
                                              className="mb-[40px] "/>}/>
            )
        }
        if (currentTheme !== 'dark') {
            return (
                <SidebarItem tooltipInfo={'Dark Side'}
                             icon={<MoonIcon onClick={() => {
                                 setTheme('dark')
                             }} width={50} fill={'#5590C1'}
                                             className="mb-[40px]"/>}/>
            )
        }
    }

    const RenderLogoutIcon = () => {
        if (!mounted) return null;
        const currentTheme = theme === "system" ? systemTheme : theme;
        if (currentTheme === 'dark') {
            return (
                <LoginIcon width={50} fill={'#ffffff'}
                    // onClick={onLogoutClickHandle}
                />
            )
        } else {
            return (
                <LoginIcon width={50} fill={'#5590C1'}
                    // onClick={onLogoutClickHandle}
                />
            )
        }
    }
    const RenderSettingIcon = () => {
        if (!mounted) return null;
        const currentTheme = theme === "system" ? systemTheme : theme;
        if (currentTheme === 'dark') {
            return (
                <SettingIcon width={50} fill={router.pathname === '/settings' ? "dark:text-grey" : '#ffffff'}
                             className="hover:fill-black"/>
            )
        } else {
            return (
                <SettingIcon width={50} fill={'#5590C1'}/>
            )
        }
    }

    const RenderNotesIcon = () => {
        if (!mounted) return null;
        const currentTheme = theme === "system" ? systemTheme : theme;
        if (currentTheme === 'dark') {
            return (
                <NotesIcon width={50}
                           fill={router.pathname === '/notes' ? "dark:text-black" : '#ffffff'}
                           className="dark:text-grey hover:fill-black"/>
            )
        } else {
            return (
                <NotesIcon width={50}
                           fill={'#5590C1'}
                           className="dark:text-grey"/>
            )
        }
    }

    const RenderAddNoteIcon = () => {
        if (!mounted) return null;
        const currentTheme = theme === "system" ? systemTheme : theme;
        if (currentTheme === 'dark') {
            return (
                <PlusIcon
                    width={60} fill={'#ffffff'}
                          className="hover:fill-black"
                    // onClick={onAddNoteClickHandler}
                />
            )
        } else {
            return (
                <PlusIcon width={50}
                          fill={'#5590C1'}
                    // onClick={onAddNoteClickHandler}
                />
            )
        }
    }

    const onLogoutClickHandle = () => {
        signOut()
    }
    const {pathname} = useRouter();

    const pagesWithNavbar = ["/notes", "/settings"];
    const renderNavbar = pagesWithNavbar.includes(pathname);
    return renderNavbar ? (
        <div
            className={`dark:bg-black ${s.sidebarWrapper}`}>
            <label ref={modalAddBtnRef} htmlFor='my-modal-add-note'
                   className="btn modal-button hidden">open
                modal</label>
            {addMoteModalShow && <ModalWindow titleNode={newNoteTitle}
                                              textNode={newNoteText}
                                              colorNote={{}}
                                              defaultColor={defaultColor}
                                              modalId={''}
                                              setDefaultColor={setDefaultColor}
                                              typeNode={'create'}
                                              onTitleChange={onTitleChangeHandler}
                                              onTextChange={onContentChangeHandler}
                                              onCreatClickHandler={onCreatClickHandler}
                                              modalShow={addMoteModalShow}
                                              onDiscard={onDiscardClickHandler}
            />}
            <div className={s.upBox}>
                <span
                    className={s.whiteBg}>
                    <PencilIcon width={50} fill={'none'} stroke={'#5590C1'}/>
                </span>
            </div>
            <div className={s.middleBox}>
                <SidebarItem tooltipInfo={'Create note'}
                             className={`${s.sidebarItem} sr:order-2 ${s.wrapper}`}
                             link={'/notes'}
                             icon={RenderAddNoteIcon()}
                             onClick={onAddNoteClickHandler}/>
                <SidebarItem tooltipInfo={'My notes'}
                             className={`${s.sidebarItem} ${s.wrapper} sr:order-1 ${ router.pathname === '/notes'? 'bg-white ' : 'none'}`}
                             // active={router.pathname === '/notes'}
                             link={'/notes'}
                             icon={RenderNotesIcon()}/>
                <SidebarItem tooltipInfo={'Settings'}
                             className={`${s.sidebarItem} sr:order-3  ${s.wrapper}  ${router.pathname === '/settings' ? 'bg-white ' : 'none'}`}
                             // active={router.pathname === '/settings'}
                             link={'/settings'}
                             icon={RenderSettingIcon()}/>
            </div>
            <div className={s.bottomBox}>
                {RenderChangeThemeIcon()}

                <SidebarItem tooltipInfo={'Log out'}
                             className={ `${s.sidebarItem} mb-[40px] hover:bg-transparent`}
                             redActive={true}
                             link={'/#'}
                             icon={RenderLogoutIcon()}
                             onClick={onLogoutClickHandle}
                />
            </div>
            <div className={'bg'}></div>
        </div>
    ) : null
};

export default Sidebar;
