// import {useRouter} from "next/router";
// import {useEffect, useRef, useState} from "react";
// import {useAppDispatch, useAppSelector} from "../utils/hooks";
// import {initializeApp} from "../bll/slices/authSlice";
// import Sidebar from "./Sidebar/Sidebar";
// import {Spinner} from "./Spinner";
//
// export const RouteGuard = ({children}: any) => {
//
//
//     const {isLoggedIn, isInitialized} = useAppSelector(state => state.auth)
//     const dispatch = useAppDispatch()
//
//     useEffect(() => {
//         if (!effectRan.current) {
//             dispatch(initializeApp())
//         }
//         return () => {
//             effectRan.current = true
//         }
//     }, [dispatch])
//
//
//     return (
//         <>
//             {!isInitialized
//                 ?
//                 <div style={{
//                     width: "100%",
//                     height: '100vh',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: "center"
//                 }}>
//                     <Spinner size={'300px'}/>
//                 </div>
//                 :
//                 <div>
//                     {isLoggedIn && <Sidebar/>}
//                     <div className='flex flex-col bg-white dark:bg-black'>
//                         {children}
//                     </div>
//                 </div>
//             }
//         </>
//     )
//
//
// }

export default ()=>{}
