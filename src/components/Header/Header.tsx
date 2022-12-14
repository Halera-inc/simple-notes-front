import UserCircleIcon from "../../assets/images/UserCircleIcon";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import {useRouter} from "next/router";
import {APP_ROOTS, getPageName} from "../../utils/getPageName";
import ButtonIcon from "../../assets/images/ButtonIcon";
import {useSession} from "next-auth/react";
import Button from "../universalComponent/Button/Button";
import SearchModule from "./SearchModule";
import s from "./PagesHeader.module.css"
import {setSearchParams} from "../../bll/slices/notesSlice";
import { getServerSideProps } from "pages/notes";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import Image from 'next/image'


const Header = () => {
    const userName = useAppSelector(state => state.profile.user)
    const {data: session} = useSession()
    const pageName = getPageName(useRouter().pathname as APP_ROOTS)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [login, setLogin] = useState<boolean>(false)
    const [hiddenName, setHiddenName] = useState(false)
    const sessionData = useSession()
    const userAvatar = useAppSelector(state => state.profile.userAvatar)


    useEffect(() => {
        if(window.innerWidth>470){
            setHiddenName(false)
        }
    }, []);


    const backNotes=()=>{
        dispatch(setSearchParams({newValue:''}))
    }
    const showSearchHandler=(value:boolean)=>{
        setHiddenName(value)
    }

    const getSessionInfoHandler = () => {

        console.log(sessionData)
    }


    return (
        <>
            {router.pathname !== '/'
                ? <div>
                    {session
                        ? <div
                            className={`dark:bg-grey pl-[150px] backdrop-blur-md dark:bg-grey/70 bg-white/70 fixed w-screen w-180
                            z-20 justify-space flex justify-between items-center h-[100px]  sc:pl-[120px] sv:h-[80px] sr:pl-[30px] ${hiddenName ? "sl:justify-center": '' } `}>
                            { hiddenName ?
                                ''
                                :
                            <p onClick={backNotes} className={ `dark:text-white ${s.pageName } `}>
                                {pageName}
                            </p>}
                            <div className={`flex  w-[600px] items-center mr-[74px] sa:mr-[6px] xm:w-[auto] sd:mr-[-16px] sb:mr-[-44px] md:mr-[-20px]
                                ${router.pathname === '/settings' ? 'justify-end' : 'justify-between' }`}>
                                {
                                    router.pathname === '/settings' ? '':
                                <SearchModule showSearchHandler={showSearchHandler}  setHiddenName={setHiddenName}
                                              hiddenName={hiddenName}/>}

                                {/*<button onClick={getSessionInfoHandler}>GetSessioninfo</button>*/}
                                <p className={`dark:text-white text-lg text-black xm:hidden  ${router.pathname === '/settings' ? 'mr-[20px]' :'' }`}>{session?.user?.name}</p>
                                {!userAvatar
                                    ? <UserCircleIcon width={'3em'} height={'3em'} fill={'#212121'} className="dark:text-white xm:hidden"/>
                                    : <Image width={60} height={60} alt={'avatar'} src={userAvatar} className={s.img}/>}
                            </div>
                        </div>
                        : <div className='dark:bg-grey z-40 flex justify-between items-center h-10 pt-[45px] pb-[35px] pr-[100px]
                        '>
                            <p className='dark:text-white px-32 text-[35px] font-bold ml-[75px]'>Simple Notes</p>
                            <div className='flex justify-between w-64 items-center mr-[100px]'>
                                <a href={'/about'} className='text-blue-dark  text-[25px] mr-[90px]'>About</a>
                                {session && <div>
                                    <Button title='Logout'/>
                                </div>}
                                {!session && <div className="flex mr-[45px]">
                                    <ButtonIcon/>
                                </div>}
                            </div>
                        </div>
                    }
                </div>
                : null
            }

        </>
    )


}

export default Header;
