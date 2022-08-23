import React from 'react';
import s from '../styles/MyNotesUpperBar.module.css'
import SearchIcon from "src/assets/images/SearchIcon";
import UserCircleIcon from "src/assets/images/UserCircleIcon";
import ChevronDownIcon from "src/assets/images/ChevronDownIcon";

const MyNotesUpperBar = (props: { title: string, nameUser: string }) => {
    return (
        <div className={s.myNotes}>
            <div className={s.title}>
                {props.title}
            </div>
            <div className={s.icons}>
                <SearchIcon color={'black'} width={'3em'} height={'3em'}/>
                <UserCircleIcon color={'black'} width={'3em'} height={'3em'}/>
                <span className={s.user}>{props.nameUser}</span>
                <ChevronDownIcon width={'3em'} height={'3em'}/>
            </div>
        </div>
    );
};

export default MyNotesUpperBar;
