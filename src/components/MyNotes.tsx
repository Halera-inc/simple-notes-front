import React from 'react';
import s from '../styles/MyNotes.module.css'
import SearchIcon from "src/assets/images/SearchIcon";
import UserCircleIcon from "src/assets/images/UserCircleIcon";
import ChevronDownIcon from "src/assets/images/ChevronDownIcon";


const MyNotes = (props: { title: string, nameUser: string }) => {
    return (
        <div className={s.myNotes}>
            <div className={s.title}>
                {props.title}
            </div>
            <div className={s.icons}>
                <SearchIcon width={'3em'} height={'3em'}/>
                <UserCircleIcon width={'3em'} height={'3em'}/>
                <span className={s.user}>{props.nameUser}</span>
                <ChevronDownIcon width={'3em'} height={'3em'}/>
            </div>

        </div>
    );
};

export default MyNotes;
