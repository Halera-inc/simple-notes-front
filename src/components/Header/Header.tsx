import SearchIcon from "../../assets/images/SearchIcon";
import UserCircleIcon from "../../assets/images/UserCircleIcon";
import {useState} from "react";
import DropDown from "./DropDown";


const Header = () => {

    const liArray = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7']
    const [isCollapsed, setIsCollapsed] = useState(false)
    const collapsedHandler = () => {
    }

    return (
        <div className='bg-orange-500 flex justify-between items-center h-14'>
            <p className='px-32 text-xl'>Header</p>
            <div className='flex justify-around w-96 items-center'>
                <SearchIcon width={'1.5em'} height={'1.5em'}/>
                <UserCircleIcon width={'3em'} height={'3em'}/>
                <p>Ivanov S.</p>
                <DropDown isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} dropItems={liArray} collapsed={collapsedHandler}/>
            </div>
        </div>
    )
        ;
};

export default Header;