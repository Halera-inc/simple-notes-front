import SearchIcon from "../../assets/images/SearchIcon";
import UserCircleIcon from "../../assets/images/UserCircleIcon";
import React, {useState} from "react";
import DropDown from "./DropDown";
import {useAppSelector} from "../../utils/hooks";
import {useRouter} from "next/router";
import {APP_ROOTS, getPageName} from "../../utils/getPageName";
import Button from "../universalComponent/Button";
import ButtonIcon from "../../assets/images/ButtonIcon";


const Header = () => {

    const liArray = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7'] //todo must be replace with value from profile slice
    const [isCollapsed, setIsCollapsed] = useState(false)
    const userName = useAppSelector(state => state.profile.user.username)
    const pageName = getPageName(useRouter().pathname as APP_ROOTS)
    const isAuth = true                                   //todo must be replace with value from profile slice

    //for login button todo must be refactoring after API make
    const [login, setLogin] = useState<boolean>(false)
    const onChangeLogin = () => {
        setLogin(!login)
    }

    {
        if (isAuth) {
            return (

                <div className='flex justify-between items-center h-14 mt-[31px] mb-[35px]'>
                    <p className='px-[140px] text-[35px] font-bold'>{pageName}</p>
                    <div className='flex justify-between w-[340px] items-center mr-[74px]'>
                        <SearchIcon width={'1.875em'} height={'1.875em'}/>
                        <UserCircleIcon width={'3em'} height={'3em'}/>
                        <p className='text-lg'>{userName}</p>
                        <DropDown isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} dropItems={liArray}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='flex justify-between items-center h-14 mt-[29px] mb-[35px] mr-[100px]'>
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
            )
        }
    }
}

export default Header;