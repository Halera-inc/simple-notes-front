import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../utils/hooks";
import {me} from "../bll/slices/authSlice";
import Sidebar from "./Sidebar/Sidebar";

export const RouteGuard = ({children}: any) => {

    const router = useRouter()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const [authorized, setAuthorized] = useState(false);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(me())
        //     // on initial load - run auth check
        //     authCheck(router.asPath)
        //     // on route change start - hide page content by setting authorized to false
        //     // const hideContent = () => setAuthorized(false);
        //     // router.events.on('routeChangeStart', hideContent);
        //     // on route change complete - run auth check
        //     router.events.on('routeChangeComplete', authCheck)
        //     // unsubscribe from events in useEffect return function
        //     return () => {
        //         // router.events.off('routeChangeStart', hideContent);
        //         router.events.off('routeChangeComplete', authCheck);
        //     }
    }, [])

    // function authCheck(url: string) {
    //     dispatch(me())
    //     // redirect to login page if accessing a private page and not logged in
    //     const publicPaths = ['/login', '/registration', '/', '/about'];
    //     const path = url.split('?')[0];
    //     if (!isLoggedIn && !publicPaths.includes(path)) {
    //         setAuthorized( );
    //         router.push({
    //             pathname: '/login',
    //             query: {returnUrl: router.asPath}
    //         });
    //     } else {
    //         setAuthorized(true);
    //     }
    // }

    return isLoggedIn && children
}

//
// <div>
//                     {router.pathname === '/'
//                     || router.pathname === '/login'
//                     || router.pathname === '/registration'
//                     || router.pathname === '/about'
//                     || router.pathname === '/404'
//
//                         ? null
//                         : <Sidebar/>}
//                     <div className='flex flex-col bg-white dark:bg-black'>
//                         {router.pathname === '/'
//                         || router.pathname === '/login'
//                         || router.pathname === '/registration'
//                         || router.pathname === '/about'
//                         || router.pathname === '/404'
//                             ? <Component {...pageProps} />
//                             :
//                                 <Component {...pageProps} />
//
//                         }
//
//                     </div>
//
//                 </div>