import SearchIcon from "../../assets/images/SearchIcon";
import UserCircleIcon from "../../assets/images/UserCircleIcon";
import React, {useState} from "react";
import {useAppSelector} from "../../utils/hooks";
import {useRouter} from "next/router";
import {APP_ROOTS, getPageName} from "../../utils/getPageName";
import ButtonIcon from "../../assets/images/ButtonIcon";
import Button from "../universalComponent/Button/Button";
import SearchModule from "./SearchModule";


const Header = () => {
    const userName = useAppSelector(state => state.profile.user)
    const pageName = getPageName(useRouter().pathname as APP_ROOTS)
    const isAuth = useAppSelector(state => state.auth.isLoggedIn)
    const router = useRouter()
    const [login, setLogin] = useState<boolean>(false)
    const onChangeLogin = () => {
        setLogin(!login)
    }

    return (
        <>
            {router.pathname !== '/'
                ? <div>
                    {isAuth
                        ? <div
                            className='z-50 backdrop-blur-md bg-white/70 absolute w-screen w-180 justify-space flex justify-between items-center h-[100px] mb-[35px]'>
                            <p className='text-[35px] font-bold ml-[128px] text-black '>
                                {pageName}
                            </p>
                            <div className='flex justify-between w-[540px] items-center mr-[74px]'>
                                <SearchModule/>
                                <p className='text-lg text-black'>{userName.email}</p>
                                <UserCircleIcon width={'3em'} height={'3em'} fill={'#212121'}/>
                            </div>
                        </div>
                        : <div className='z-50 flex justify-between items-center h-10 mt-[29px] mb-[35px] mr-[100px]'>
                            <p className='px-32 text-[35px] font-bold ml-[75px]'>Simple Notes</p>
                            <div className='flex justify-between w-64 items-center mr-[100px]'>
                                <a href={'/about'} className='text-blue-dark text-[25px] mr-[90px]'>About</a>
                                {isAuth && <div>
                                    <Button title='Logout'/>
                                </div>}
                                {!isAuth && <div className="flex mr-[45px]">
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
