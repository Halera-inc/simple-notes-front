import React, {useState} from 'react';
import s from '../../styles/Settings.module.css'
import Button from "../universalComponent/Button/Button";
import {useAppSelector} from "src/utils/hooks";
import InputForm from "src/components/Settings/inputform/InputForm";
import {useSession} from "next-auth/react";
import Image from "next/image";
import {OtherSettings} from "./OtherSettings";
import {UserType} from "../../utils/types";


const MainBlockSettings = () => {
    const {data: session} = useSession()
    const user = useAppSelector<UserType>(state => state.profile.user)
    const [edit, setEdit] = useState(false);

    const editProfileHandler = () => {
        setEdit(!edit);
    }

    return (
        <div className={s.wrapperMaimSettings}>
            <div className={s.leftArea}>
                <div className={s.myProfile}>
                    <div className={s.imgProfileWrapper}>
                        <Image src={`${session?.user?.image}`}
                               width={200}
                               height={200}
                               alt={'avatar'}/>
                    </div>
                    <div className={s.editWrapper}>
                        <ul className={s.editData}>
                            <li className={s.myName}>{session?.user?.email}</li>
                            <li className={s.reg}> {user.createdAt}</li>
                            <li className={s.reg}>{user?.country}</li>
                        </ul>
                        <Button title={'Edit'}
                                callback={editProfileHandler}
                                style={{margin: 0}}/>
                    </div>
                </div>
                {edit ? <InputForm/> : ''}
            </div>
            <OtherSettings/>
        </div>
    );
};

export default MainBlockSettings;