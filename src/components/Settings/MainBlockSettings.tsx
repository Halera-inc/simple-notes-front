import React, {useState} from 'react';
import s from '../../styles/Settings.module.css'
import Button from "../universalComponent/Button/Button";
import {useAppSelector} from "src/utils/hooks";
import InputForm from "src/components/Settings/inputform/InputForm";
import {useSession} from "next-auth/react";
import {OtherSettings} from "./OtherSettings";
import {UserType} from "../../utils/types";
import {LoaderAvatar} from "./LoaderAvatar";
import { Session } from 'next-auth/core/types';



type MainBlockSettingsPropsType = {
    session: Session & {user?: {accessToken?: boolean}} | null
}

const MainBlockSettings:React.FC<MainBlockSettingsPropsType> = ({session}) => {


    // const {data: session} = useSession()
    const user = useAppSelector<UserType>(state => state.profile.user)
    const [edit, setEdit] = useState(false);
    // const sessionData = useSession();
    console.log(session)

    const editProfileHandler = () => {
        setEdit(!edit);
    }

    return (
        <div className={s.wrapperMainSettings}>
            <div className={s.leftArea}>
                <div className={s.myProfile}>
                    <LoaderAvatar session={session}/>

                    <div className={s.editWrapper}>
                        <ul className={s.editData}>
                            <li className={s.myName}>{session?.user?.email}</li>
                            <li className={s.reg}> {session?.user?.name}</li>
                        </ul>
                        {session && session.user && !session.user.accessToken && <Button title={'Edit'}
                                callback={editProfileHandler}
                                className={"dark:bg-black dark:border-white dark:text-white"}
                                style={{
                                    width: 120,
                                    height: 40,
                                    fontSize: 18,
                                    margin:0
                                }}
                              />
                        }
                    </div>
                </div>
                {edit ? <InputForm/> : ''}
            </div>
            <OtherSettings session={session}/>
        </div>
    );
};

export default MainBlockSettings;