import UserCircleIcon from "../../assets/images/UserCircleIcon";
import React, {useState} from "react";
import {useAppSelector} from "../../utils/hooks";
import {useRouter} from "next/router";
import {APP_ROOTS, getPageName} from "../../utils/getPageName";
import ButtonIcon from "../../assets/images/ButtonIcon";
import {useSession} from "next-auth/react";
import Button from "../universalComponent/Button/Button";
import SearchModule from "./SearchModule";


const Header = () => {
    const userName = useAppSelector(state => state.profile.user)
    const {data: session} = useSession()
    const pageName = getPageName(useRouter().pathname as APP_ROOTS)
    const router = useRouter()
    const [login, setLogin] = useState<boolean>(false)
    const onChangeLogin = () => {
    }


    return (
        <>
            {router.pathname !== '/'
                ? <div>
                    {session
                        ? <div
                            className='dark:bg-grey   backdrop-blur-md dark:bg-grey/70 bg-white/70 fixed w-screen w-180
                            z-40 justify-space flex justify-between
                            items-center h-[100px] mb-[35px]  max: pr-[50px] max: pl-[50px]
                           '>
                            <p className='text-[35px] dark:text-white font-bold ml-[128px] text-black '>
                                {pageName}
                            </p>
                            <div className='flex justify-between w-[540px] items-center mr-[74px]'>
                                <SearchModule/>
                                <p className=' dark:text-white text-lg text-black'>{session?.user?.name}</p>
                                <UserCircleIcon width={'3em'} height={'3em'} fill={'#212121'} className={"dark:text-white"}/>
                            </div>
                        </div>
                        : <div className='  dark:bg-grey z-40 flex justify-between items-center h-10 pt-[45px] pb-[35px] pr-[100px]
                        '>
                            <p className=' dark:text-white px-32 text-[35px] font-bold ml-[75px]'>Simple Notes</p>
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
