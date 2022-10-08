import React from 'react';
import s from 'src/styles/landingStyle/Header.module.css'
import Button from "src/components/universalComponent/Button/Button";
import {useRouter} from "next/router";
import Link from "next/link";
import UserIcon from "../../../assets/images/UserIcon";

const Header = (props: { title: string }) => {

    const buttonHeader = {
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '20px',
        paddingRight: '20px',
        fontSize: '23px',
    }

    const router = useRouter()
    const onChangeLogin = () => {
        typeof window !== 'undefined' && router.push('/login')

    }

    return (
        <div className={"flex flex justify-between items-center h-[15vh]"}>
            <h2 className={' font-bold p-y-[39px] p-x-[0] leading-[42px] text-[35px]  dark:text-white dark:font-semibold md:text-[30px]'}>{props.title}</h2>
            <div className={s.wrapperBtn}>
                <Link href={'/about'}>
                    <p className={s.about}>About</p>
                </Link>
                <Button
                    style={buttonHeader}
                    title='Login'
                    icon={<UserIcon/>}
                    callback={onChangeLogin}/>
            </div>
        </div>
    );
};

export default Header;
