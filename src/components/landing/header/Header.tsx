import React, {useState} from 'react';
import s from 'src/styles/landingStyle/Header.module.css'
import Button from "src/components/universalComponent/Button";
import ButtonIcon from "src/assets/images/ButtonIcon";


const Header = (props: { title: string }) => {
    const [login, setLogin] = useState<boolean>(false)
    const onChangeLogin = () => {
        setLogin(!login)
    }

    return (
        <div className={s.header}>
            <h2 className={s.title}>{props.title}</h2>
            <div className={s.wrapperBtn}>
                <a href={'/about'} className={s.about}>About</a>
                <div className={s.btn}>
                    {login && <Button title='Login' onChangeParams={onChangeLogin}/>}
                    {!login && <div className={s.btnIcon}>
                        <ButtonIcon onClick={onChangeLogin}/>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Header;
