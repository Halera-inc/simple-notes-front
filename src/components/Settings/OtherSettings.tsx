import s from "../../styles/Settings.module.css";
import Button from "../universalComponent/Button/Button";
import React, { ChangeEvent, useState } from "react";
import { useTheme } from "next-themes";

export const OtherSettings = () => {
    const inputStyle= " collapse collapse-arrow border dark:text-white  border-blue-dark bg-blue dark:bg-black dark:color-white dark:border-none " +
        "  rounded-none  text-blue-dark mb-5 pl-3  text-xl "

    const {systemTheme, theme, setTheme} = useTheme();

    const onThemeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked){
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    return (
        <div className={s.otherSettings}>
            <h3 className={s.other}>Other settings</h3>
            <div className={s.otherWrapper}>
                <div tabIndex={1}
                     className={inputStyle}>
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">
                        Theme settings
                    </div>
                    <div className="collapse-content">
                        <div className='flex'>
                            <p className='pr-[20px] self-end'>Swap youre side</p>
                            <label className="swap swap-rotate">
                                <input type="checkbox" onChange={onThemeChangeHandler} checked={theme === 'dark'}/>
                                <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                                <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                            </label>
                        </div>
                    </div>
                </div>
                <div tabIndex={2} className={inputStyle}>
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">
                        Settings Two
                    </div>
                    <div className="collapse-content">
                        <p>Settings Two</p>
                    </div>
                </div>
                <div tabIndex={3} className={inputStyle}>
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">
                        Setting Three
                    </div>
                    <div className="collapse-content">
                        <p>Setting Three</p>
                    </div>
                </div>
                <div tabIndex={4}
                     className={`${s.last_child} ${inputStyle}`}>
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">
                        Change password
                    </div>
                    <div className={"collapse-content text-right  "}>
                        <ul className={s.collapseContent}>
                            <li>
                                <p className="dark:text-white">Current password</p>
                                <input type="password" id='password'
                                       className={`${s.inputI} dark:bg-grey dark:border-none`}/>
                            </li>
                            <li>
                                <p className="dark:text-white">New password </p>
                                <input type="password" id='password'
                                       className={`${s.inputI} dark:bg-grey dark:border-none`}/>
                            </li>
                            <li>
                                <p className="dark:text-white">Repeat password</p>
                                <input type="password" id='password'
                                       className={`${s.inputI} dark:bg-grey dark:border-none`}/>
                            </li>
                            <li>
                                <div> </div>
                                <Button title={'Save'}
                                        className={"dark:bg-black dark:border-white dark:text-white"}
                                        style={{backgroundColor: 'white',
                                    width: 158,
                                    height: 50,
                                    fontSize: 22,}}/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}