import React,{useEffect} from 'react';
import {useAppSelector,useAppDispatch} from "src/utils/hooks";
import {setIsAppSuccess} from '../../../bll/slices/appSlice';

export const SnackBar = () => {
    const dispatch = useAppDispatch()
     const avatarIsSavedStatus = useAppSelector(state=>state.app.isAppSuccess.status)
     const avatarIsSavedTitle = useAppSelector(state=>state.app.isAppSuccess.title)
    console.log(avatarIsSavedStatus)
    useEffect(() => {
        if (avatarIsSavedStatus) {
            setTimeout(() => {
                dispatch(setIsAppSuccess({status: false,title:''}))
            }, 1500)
        }
    }, [avatarIsSavedStatus,avatarIsSavedTitle])
    return (
        { avatarIsSavedStatus }?
            <div className="alert alert-info shadow-lg">
        <div >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{avatarIsSavedTitle}</span>
        </div>
    </div> : <></>


);
};

