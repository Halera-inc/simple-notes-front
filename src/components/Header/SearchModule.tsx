import React, {ChangeEvent, useEffect, useState} from 'react';
import SearchIcon from "../../assets/images/SearchIcon";
import {useDebounce} from 'use-debounce';
import {useAppDispatch} from "../../utils/hooks";
import {setSearchParams} from 'src/bll/slices/notesSlice';
import SearchIconBlack from "../../assets/images/SearchIconBlack";
import s from "./PagesHeader.module.css";

type SearchModuleType = {
    showSearchHandler: (value: boolean) => void
    setHiddenName: (value: boolean) => void
    hiddenName: boolean
}

const SearchModule = (props: SearchModuleType) => {

    const onSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }
    const closedHandler=()=>{
        props.setHiddenName(false)
    }

    const dispatch = useAppDispatch()
    const [searchValue, setSearchValue] = useState('')
    const [debouncedSearchValue] = useDebounce<string>(searchValue, 700)


    useEffect(() => {
        dispatch(setSearchParams({newValue: debouncedSearchValue}))
    }, [dispatch, debouncedSearchValue])

    const showSearchHandler = () => {
        props.setHiddenName(true)
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
                <input onChange={onSearchValueChange} onBlur={closedHandler} className={`sl:ml-[6%] ${s.inputHidden}`} type={'text'} placeholder={'search...'}/> : ''}
            <button className={'hidden sl:block'} onClick={showSearchHandler}>
                <SearchIconBlack className={`hidden sl:block  ${ props.hiddenName ? "sl:ml-[150px] ss:ml-[120px] md:ml-[90px] mm:ml-[65px] mmm:ml-[40px]": " " } `} height={35}
                                 width={35}/>
            </button>

        </div>
    );
};

export default SearchModule;
