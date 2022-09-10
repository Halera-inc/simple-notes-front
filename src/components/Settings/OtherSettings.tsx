import s from "../../styles/Settings.module.css";
import Button from "../universalComponent/Button/Button";
import React from "react";

export const OtherSettings = () => {
    return (
        <div className={s.otherSettings}>
            <h3 className={s.other}>Other settings</h3>
            <div className={s.otherWrapper}>
                <div tabIndex={1}
                     className=" collapse collapse-arrow border  border-blue-dark bg-blue placeholder:text-blue-dark rounded-none text-blue-dark  text-xl mb-5 pl-3">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">
                        Settings One
                    </div>
                    <div className="collapse-content">
                        <p>Settings One</p>
                    </div>
                </div>
                <div tabIndex={2} className=" collapse collapse-arrow border  border-blue-dark bg-blue placeholder:text-blue-dark rounded-none text-blue-dark  text-xl mb-5 pl-3">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">
                        Settings Two
                    </div>
                    <div className="collapse-content">
                        <p>Settings Two</p>
                    </div>
                </div>
                <div tabIndex={3} className=" collapse collapse-arrow border  border-blue-dark bg-blue placeholder:text-blue-dark rounded-none text-blue-dark  text-base  mb-5 pl-3">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">
                        Setting Three
                    </div>
                    <div className="collapse-content">
                        <p>Setting Three</p>
                    </div>
                </div>
                <div tabIndex={4}
                     className=" collapse collapse-arrow border  border-blue-dark bg-blue placeholder:text-blue-dark rounded-none text-blue-dark  text-xl pl-3">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">
                        Change password
                    </div>
                    <div className={"collapse-content text-right "}>
                        <ul className={s.collapseContent}>
                            <li>
                                <p>Current password</p>
                                <input type="password" id='password'
                                       className={s.inputI}/>
                            </li>
                            <li>
                                <p>New password </p>
                                <input type="password" id='password'
                                       className={s.inputI}/>
                            </li>
                            <li>
                                <p>Repeat password</p>
                                <input type="password" id='password'
                                       className={s.inputI}/>
                            </li>
                            <li>
                                <Button title={'Save'} style={{backgroundColor: 'white'}}/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}