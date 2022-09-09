import React from 'react';
import s from 'src/styles/landingStyle/Header.module.css'
import Button from "src/components/universalComponent/Button";
import {useRouter} from "next/router";


const Header = (props: { title: string }) => {

    const buttonLogin = {
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '35px',
        paddingRight: '35px',
        fontSize: '25px',
    }

    const router = useRouter()

    const onChangeLogin = () => {
        typeof window !== 'undefined' && router.push('/login')
    }

    return (
        <div className={s.header}>
            <h2 className={s.title}>{props.title}</h2>
            <div className={s.wrapperBtn}>
                <a href={'/about'} className={s.about}>About</a>
                <div className={s.btn}>
                    <div className={s.btnIcon}>
                        <Button title='Login' style={buttonLogin} onChangeParams={onChangeLogin}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
