import React, {useState} from 'react';
import s from '../../styles/Settings.module.css'
import Button from "../universalComponent/Button";
import {useAppSelector} from "src/utils/hooks";


const MainBlockSettings = () => {
    const buttonProfile = {
        paddingTop: '7px',
        paddingBottom: '7px',
        paddingLeft: '30px',
        paddingRight: '30px',
        fontSize: '15px',
    }

    const buttonEditSave = {
        paddingTop: '7px',
        paddingBottom: '7px',
        paddingLeft: '37px',
        paddingRight: '37px',
        fontSize: '25px',

    }
    const buttonSettingsSave = {
        paddingTop: '7px',
        paddingBottom: '7px',
        paddingLeft: '37px',
        paddingRight: '37px',
        fontSize: '22px',
        backgroundColor: '#ffffff',

    }
    const user = useAppSelector(state => state.profile.user)

    const [edit, setEdit] = useState(false);
    const editProfileHandler = () => {
        setEdit(!edit);
    }

    return (
        <div className={s.wrapperMaimSettings}>
            <div className={s.leftArea}>
                <div className={s.myProfile}>
                    <img className={s.imgProfile} alt={''}/>
                    <div className={s.editWrapper}>
                        <ul className={s.editData}>
                            <li className={s.myName}>{user.email}</li>
                            <li className={s.reg}> {user.createdAt}</li>
                            <li className={s.reg}>{user.country}</li>
                        </ul>
                        <Button title={'Edit'} onChangeParams={editProfileHandler} style={buttonProfile}/>
                    </div>
                </div>
                {edit ?
                    <div className={s.edit}>
                        <ul className={s.editMyProfile}>
                            <li>Username: <input type="text" placeholder="Ivanov Ivan"
                                                 className={s.inf}/></li>
                            <li>Email: <input type="text" placeholder="marginadegames@gmail.com"
                                              className={s.inf}/></li>
                            <li>Country: <input type="text" placeholder=" Belarus"
                                                className={s.inf}/>
                            </li>
                        </ul>
                        <Button title={'Save'} style={buttonEditSave}/>
                    </div>
                    : ""}

            </div>

            <div className={s.otherSettings}>
                <h3 className={s.other}>Other settings</h3>

                <div className={s.otherWrapper}>

                    <div tabIndex={1}
                         className=" collapse collapse-arrow border  border-blue-dark bg-blue placeholder:text-blue-dark
                rounded-none text-blue-dark  text-xl mb-5 pl-3">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">
                            Settings One
                        </div>
                        <div className="collapse-content">
                            <p>Settings One</p>
                        </div>
                    </div>

                    <div tabIndex={2} className=" collapse collapse-arrow border  border-blue-dark bg-blue placeholder:text-blue-dark
                rounded-none text-blue-dark  text-xl mb-5 pl-3">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">
                            Settings Two
                        </div>
                        <div className="collapse-content">
                            <p>Settings Two</p>
                        </div>
                    </div>

                    <div tabIndex={3} className=" collapse collapse-arrow border  border-blue-dark bg-blue placeholder:text-blue-dark
                rounded-none text-blue-dark  text-base  mb-5 pl-3">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">
                            Setting Three
                        </div>
                        <div className="collapse-content">
                            <p>Setting Three</p>
                        </div>
                    </div>

                    <div tabIndex={4}
                         className=" collapse collapse-arrow border  border-blue-dark bg-blue placeholder:text-blue-dark
                rounded-none text-blue-dark  text-xl pl-3">
                        <input type="checkbox" />
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
                                    <div></div>
                                    <Button title={'Save'} style={buttonSettingsSave}/>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MainBlockSettings;
