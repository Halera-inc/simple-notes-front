import SearchIcon from "../../assets/images/SearchIcon";
import UserCircleIcon from "../../assets/images/UserCircleIcon";
import React, {useState} from "react";
import DropDown from "./DropDown";
import {useAppSelector} from "../../utils/hooks";
import {useRouter} from "next/router";
import {APP_ROOTS, getPageName} from "../../utils/getPageName";
import ButtonIcon from "../../assets/images/ButtonIcon";
import Button from "../universalComponent/Button";


const Header = () => {

    const liArray = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7'] //todo must be replace with value from profile slice
    const [isCollapsed, setIsCollapsed] = useState(false)
    const userName = useAppSelector(state => state.profile.user.email)
    const pageName = getPageName(useRouter().pathname as APP_ROOTS)
    const isAuth = true                                   //todo must be replace with value from profile slice
    const router = useRouter()
    //for login button todo must be refactoring after API make
    const [login, setLogin] = useState<boolean>(false)
    const onChangeLogin = () => {
        setLogin(!login)
    }


    return (
        <>
            {router.pathname !== '/'
                ? <div>
                    {isAuth
                        ? <div className='backdrop-blur-md bg-white/70 absolute w-screen w-100 justify-space flex justify-between items-center h-[100px] mb-[35px]'>
                            <p className='text-[35px] font-bold ml-[128px]'>
                                {pageName}
                            </p>
                            <div className='flex justify-between w-[340px] items-center mr-[74px]'>
                                <SearchIcon width={'40px'} height={'40px'} fill={'#212121'}/>
                                <p className='text-lg'>{userName}</p>
                                <UserCircleIcon width={'3em'} height={'3em'} fill={'#212121'}/>
                            </div>
                        </div>
                        : <div className='flex justify-between items-center h-10 mt-[29px] mb-[35px] mr-[100px]'>
                            <p className='px-32 text-[35px] font-bold ml-[75px]'>Simple Notes</p>
                            <div className='flex justify-between w-64 items-center mr-[100px]'>
                                <a href={'/about'} className='text-blue-dark text-[25px] mr-[90px]'>About</a>
                                {login && <div>
                                    <Button title='Logout' onChangeParams={onChangeLogin}/>
                                </div>}
                                {!login && <div className="flex mr-[45px]">
                                    <ButtonIcon onClick={onChangeLogin}/>
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
