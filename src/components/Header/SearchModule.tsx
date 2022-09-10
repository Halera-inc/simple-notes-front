import React, {ChangeEvent, useEffect, useState} from 'react';
import SearchIcon from "../../assets/images/SearchIcon";
import {useTheme} from "next-themes";
import {useDebounce} from 'use-debounce';
import {useAppDispatch} from "../../utils/hooks";
import { setSearchParams } from 'src/bll/slices/notesSlice';

const SearchModule = () => {

    const onSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }
    const searchIconClickHandler = () => {
        setShow(!show)
    }

    const theme = useTheme().theme
    const dispatch = useAppDispatch()
    const [show, setShow] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [debouncedSearchValue] = useDebounce<string>(searchValue, 700)

    useEffect(() => {
        dispatch(setSearchParams({newValue: debouncedSearchValue}))
    }, [dispatch, debouncedSearchValue])


    return (
        <div className='flex justify-end w-[300px]'>
            <input className={show
                ? `rounded-lg duration-700 w-[200px] mr-[20px] border-black border-[1px] pl-2 ${theme === 'light' ? 'bg-gray text-black' : ''}`
                : 'rounded-lg w-[0px] duration-700 mr-[20px]'} type="text" value={searchValue}
                   onChange={onSearchValueChange}/>
            <SearchIcon width={'40px'} height={'40px'} fill={'#212121'} onClick={searchIconClickHandler}/>
        </div>
    );
};

export default SearchModule;