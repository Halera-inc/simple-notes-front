import SearchIcon from "../../assets/images/SearchIcon";
import UserCircleIcon from "../../assets/images/UserCircleIcon";
import {useState} from "react";
import DropDown from "./DropDown";
import {useAppSelector} from "../../utils/hooks";
import {useRouter} from "next/router";
import {APP_ROOTS, getPageName} from "../../utils/getPageName";


const Header = () => {

    const liArray = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7']
    const [isCollapsed, setIsCollapsed] = useState(false)
    const userName = useAppSelector(state=>state.profile.user.username)
    const pageName = getPageName(useRouter().pathname as APP_ROOTS)

    return (
        <div className='bg-orange-500 flex justify-between items-center h-14'>
            <p className='px-32 text-xl'>{pageName}</p>
            <div className='flex justify-around w-96 items-center'>
                <SearchIcon width={'1.5em'} height={'1.5em'}/>
                <UserCircleIcon width={'3em'} height={'3em'}/>
                <p>{userName}</p>
                <DropDown isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} dropItems={liArray}/>
            </div>
        </div>
    )
        ;
};

export default Header;