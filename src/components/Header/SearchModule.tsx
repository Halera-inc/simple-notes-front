import React, {ChangeEvent, useEffect, useState} from 'react';
import SearchIcon from "../../assets/images/SearchIcon";
import {useDebounce} from 'use-debounce';
import {useAppDispatch} from "../../utils/hooks";
import { setSearchParams} from 'src/bll/slices/notesSlice';
import SearchIconBlack from "../../assets/images/SearchIconBlack";
import s from "./PagesHeader.module.css";
import SearchIconWhite from "../../assets/images/SearchIconWhite";
import {useTheme} from "next-themes";
import PlusIcon from "../../assets/images/PlusIcon";

type SearchModuleType = {
    showSearchHandler: (value: boolean) => void
    setHiddenName: (value: boolean) => void
    hiddenName: boolean
}

const SearchModule = (props: SearchModuleType) => {

    const onSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }


    const dispatch = useAppDispatch()
    const {systemTheme, theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);
    const [searchValue, setSearchValue] = useState('')
    const [debouncedSearchValue] = useDebounce<string>(searchValue, 700)

    const RenderSearch = () => {
        if (!mounted) return null;
        const currentTheme = theme === "system" ? systemTheme : theme;
        if (currentTheme === 'dark') {
            return (
                <SearchIconWhite className={`hidden sl:block   ${ props.hiddenName ? "sl:ml-[150px] sl:mr-[40px] ss:ml-[120px] md:ml-[90px] mm:ml-[65px] mmm:ml-[40px]": " " } `} height={35}
                                 width={35}/>
            )
        } else {
            return (
                <SearchIconBlack className={`hidden sl:block   ${ props.hiddenName ? "sl:ml-[150px] sl:mr-[40px] ss:ml-[120px] md:ml-[90px] mm:ml-[65px] mmm:ml-[40px]": " " } `} height={35}
                                 width={35}/>
            )
        }
    }
    useEffect(() => {
        dispatch(setSearchParams({newValue: debouncedSearchValue}))
        setMounted(true)
    }, [dispatch, debouncedSearchValue])


    const showSearchHandler = () => {
        props.setHiddenName(true)
    }

    const closedHandler=()=>{
        props.setHiddenName(false);
    }

    return (
        <div className='form-control sl:flex-row sl:scale-x-100'>
            <div className='flex sb:mr-[20px] sl:hidden'>
                <input onChange={onSearchValueChange}
                       type="text"
                       placeholder="Search"
                       className={s.inputSearch}/>

                <button
                    className="btn btn-square bg-blue-dark dark:bg-blue border-1 rounded-none  border-blue-dark hover:bg-blue ">

                    <SearchIcon height={30}
                                width={30}
                                fill={'var(--blue-dark)'}
                                className={"dark:text-grey "}/>
                </button>
            </div>
            {/*если тру-то показываем*/}
            {props.hiddenName ?
                <input onChange={onSearchValueChange} onBlur={closedHandler} className={`dark:text-white dark:border-b-white 
                 dark:bg-transparent sl:ml-[6%] ${s.inputHidden}`} type={'text'} placeholder={'search...'}/> : ''}
            <button className={'hidden sl:block'} onClick={showSearchHandler}>
                {RenderSearch()}

            </button>

        </div>
    );
};

export default SearchModule;
