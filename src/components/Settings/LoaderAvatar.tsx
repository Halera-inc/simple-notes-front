import React, {ChangeEvent, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import {convertFileToBase64} from "../../utils/convertFileToBase64";
import s from "./../../styles/Settings.module.css";
import {useSession} from "next-auth/react";
import defaultImg from "./../../assets/images/nopic.jpg";
import Image from 'next/image'
import {changeImage} from "../../bll/slices/profileSlice";
import { Session } from 'next-auth/core/types';


type LoaderAvatarPropsType = {
    session: Session & {user?: {accessToken?: boolean}} | null
}

export const LoaderAvatar: React.FC<LoaderAvatarPropsType> = ({session}) => {
    const dispatch=useAppDispatch()
    // const {data: session} = useSession()


    const userAvatar = useAppSelector(state => state.profile.userAvatar)
    const [avatar, setAvatar] = useState<any>(userAvatar ? userAvatar : defaultImg)

    const refLoader = useRef<HTMLInputElement>(null)
    const selectImageHandler = () => {
        refLoader && refLoader.current?.click();
    }
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) { //e.target.files=это массив . нужно проверить что он тру и у него есть длина
            const file = e.target.files[0]
            if (file.size < 1000000) { //это одно из свойст загружаемого файла показано сколько Mbyte-1, если больше то преобразование
                convertFileToBase64(file, (file64: string) => {
                    setAvatar(file64)
                     dispatch(changeImage(file64));
                })
            } else {
                // dispatch(setErrorAC('The file is more 1 Mbyte'))
                alert('The file is more 1 mgBite')
            }
        }
    }
    return (
        <div className={s.imgProfileWrapper}>
            {userAvatar &&
                <Image
                     width={200}
                     height={200}
                     alt={'avatar'}
                     src={userAvatar}
                     className={s.img}
                />
            }
            {session && session.user && !session.user.accessToken ? <>
                <div onClick={selectImageHandler} color="action" className={s.download}>
                    <svg className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="8 17 12 21 16 17"/>
                        <line x1="12" y1="12" x2="12" y2="21"/>
                        <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/>
                    </svg>
                </div>
                <input type='file'
                       ref={refLoader}
                       onChange={uploadHandler}
                       style={{display: 'none'}}
                       accept={'img/gif'}/></> : ''}

        </div>
    );
};

