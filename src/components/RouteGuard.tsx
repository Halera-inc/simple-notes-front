import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../utils/hooks";
import {initializeApp} from "../bll/slices/authSlice";
import Sidebar from "./Sidebar/Sidebar";
import { useSession, signIn, signOut } from "next-auth/react"


export const RouteGuard = ({children}: any) => {


    const {isLoggedIn, isInitialized} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()


    // if (!isInitialized) return <div>InitializePreloader</div>
    // return <div>
    //     {isLoggedIn && <Sidebar/>}
    //     <div className='flex flex-col bg-white dark:bg-black'>
    //         {children}
    //     </div>
    // </div>
}
