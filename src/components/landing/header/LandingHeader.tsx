import React from 'react';
import s from 'src/components/landing/header/LandingHeader.module.css'
import Button from "src/components/universalComponent/Button";
import {useRouter} from "next/router";


const LandingHeader = (props: { title: string }) => {

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
                        <Button style={"login_button"}
                                title='Login' onChangeParams={onChangeLogin}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingHeader;
