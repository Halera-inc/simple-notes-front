import React, {ChangeEvent, useEffect, useState} from 'react';
import SearchIcon from "../../assets/images/SearchIcon";
import {useDebounce} from 'use-debounce';
import {useAppDispatch} from "../../utils/hooks";
import {setSearchParams} from 'src/bll/slices/notesSlice';

const SearchModule = () => {

    const onSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    const dispatch = useAppDispatch()
    const [searchValue, setSearchValue] = useState('')
    const [debouncedSearchValue] = useDebounce<string>(searchValue, 700)

    useEffect(() => {
        dispatch(setSearchParams({newValue: debouncedSearchValue}))
    }, [dispatch, debouncedSearchValue])


    return (
        <div className='form-control '>
            <div className='flex'>
                <input onChange={onSearchValueChange}
                       type="text"
                       placeholder="Search…"
                       className={'input border-1 rounded-none border-blue-dark '}/>
                <button className="btn btn-square bg-blue border-1  border-blue-dark hover:bg-blue ">
                    <SearchIcon height={30}
                                width={30}
                                fill={'var(--blue-dark)'}/>
                </button>
            </div>
        </div>
    );
};

export default SearchModule;
