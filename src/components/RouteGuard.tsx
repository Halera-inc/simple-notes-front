import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../utils/hooks";
import {me} from "../bll/slices/authSlice";
import Sidebar from "./Sidebar/Sidebar";

export const RouteGuard = ({children}: any) => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(me())
    }, [])

    return <div>
        {isLoggedIn && <Sidebar/>}
        <div className='flex flex-col bg-white dark:bg-black'>
            {children}
        </div>
    </div>
}
