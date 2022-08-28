import React from 'react';
import s from '../../styles/Settings.module.css'
import Button from "../universalComponent/Button";


const MainBlockSettings = () => {
    const buttonProfile = {
        paddingTop: '7px',
        paddingBottom: '7px',
        paddingLeft: '30px',
        paddingRight: '30px',
        fontSize: '15px',
    }
    return (
        <div className={s.wrapperMaimSettings}>
            <div className={s.myProfile}>
                <img className={s.imgProfile}/>
                <div className={s.editWrapper}>
                    <ul className={s.editData}>
                        <li className={s.myName}>Ivanov Ivan</li>
                        <li className={s.reg}>Registered in 13 Juli 2022</li>
                        <li className={s.reg}><b>ID:</b> 1234</li>
                        <li className={s.reg}><b>Notes:</b> 5</li>
                    </ul>
                    <Button title={'Edit'} style={buttonProfile}/>
                </div>
            </div>
            <div className={s.editMyProfile}>
                <div className={s.username}>Username:</div>
                <div className={s.email}>Email:</div>
                <div className={s.country}>Country:</div>
                <button>save</button>
            </div>

            <div className={s.otherSettings}></div>
            <form></form>

        </div>
    );
};

export default MainBlockSettings;