import s from "../../styles/Settings.module.css";
import Button from "../universalComponent/Button/Button";
import React from "react";

export const OtherSettings = () => {
    const inputStyle= " collapse collapse-arrow border dark:text-white  border-blue-dark bg-blue dark:bg-black dark:color-white dark:border-none " +
        "  rounded-none  text-blue-dark mb-5 pl-3  text-xl "

    return (
        <div className={s.otherSettings}>
            <h3 className={s.other}>Other settings</h3>
            <div className={s.otherWrapper}>
                <div tabIndex={1}
                     className={inputStyle}>
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">
                        Settings One
                    </div>
                    <div className="collapse-content">
                        <p>Settings One</p>
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