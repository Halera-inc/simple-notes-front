import React from 'react';
import s from '../styles/MyNotes.module.css'
import SearchIcon from "src/assets/images/SearchIcon";
import UserCircleIcon from "src/assets/images/UserCircleIcon";
import ChevronDownIcon from "src/assets/images/ChevronDownIcon";

const MyNotes = (props: { title: string }) => {
    return (
        <div className={s.MyNotes}>
            <div className={s.title}>
                {props.title}
            </div>
            <div>
                <SearchIcon/>
                <UserCircleIcon/>
                <ChevronDownIcon/>
            </div>

        </div>
    );
};

export default MyNotes;
