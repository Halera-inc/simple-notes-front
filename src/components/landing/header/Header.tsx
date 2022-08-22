import React, {useState} from 'react';
import s from 'src/styles/landingStyle/Header.module.css'
import Button from "src/components/universalComponent/Button";
import UserCircleIcon from "src/assets/images/UserCircleIcon";


const Header = (props: { title: string }) => {
    const [login, setLogin] = useState<boolean>(false)
    const onChangeLogin = () => {
        setLogin(!login)
    }

    return (
        <div className={s.header}>
            <h1 className={s.title}>{props.title}</h1>
            <div className={s.buttons}>
                <a href={'/about'} className={s.about}>About</a>
                {login && <div>
                    <Button title='Login' onChangeParams={onChangeLogin}/>
                </div>}
                {!login && <div className="flex ">
                    <UserCircleIcon width="4em" height="4em" />
                    <Button title='Sigh in' onChangeParams={onChangeLogin}/>
                </div>}
            </div>
        </div>
    );
};

export default Header;
