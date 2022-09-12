import React from 'react';
import s from 'src/styles/landingStyle/Header.module.css'
import Button from "src/components/universalComponent/Button/Button";
import {useRouter} from "next/router";
import Link from "next/link";
import UserIcon from "../../../assets/images/UserIcon";

const Header = (props: { title: string }) => {

    const router = useRouter()
    const onChangeLogin = () => {
        typeof window !== 'undefined' && router.push('/login')
    }

    return (
        <div className={s.header}>
            <h2 className={s.title}>{props.title}</h2>
            <div className={s.wrapperBtn}>
                <Link href={'/about'}>
                    <p className={s.about}>About</p>
                </Link>
                <Button title='Login'
                        icon={<UserIcon/>}
                        callback={onChangeLogin}/>
            </div>
        </div>
    );
};

export default Header;
