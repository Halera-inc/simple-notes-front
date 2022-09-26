import UserCircleIcon from "../../assets/images/UserCircleIcon";
import React, {useState} from "react";
import {useAppSelector} from "../../utils/hooks";
import {useRouter} from "next/router";
import {APP_ROOTS, getPageName} from "../../utils/getPageName";
import ButtonIcon from "../../assets/images/ButtonIcon";
import {useSession} from "next-auth/react";
import Button from "../universalComponent/Button/Button";
import SearchModule from "./SearchModule";
import s from "src/components/Header/PagesHeader.module.css";


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
                            className={s.pagesHeader_wrapper}>
                            <p className={s.pagesHeader_title}>
                                {pageName}
                            </p>
                            <div className={s.pagesHeader_search}>
                                <SearchModule/>
                                <p className='text-lg text-black'>{session?.user?.name}</p>
                                <span>
                                    <UserCircleIcon width={'3em'} height={'3em'} fill={'#212121'}/>
                                </span>
                            </div>
                        </div>
                        : <div className={s.notAuth_header}>
                            <h1>Simple Notes</h1>
                            <div className={s.noAuth_header__authBlock}>
                                <a href={'/about'} className='text-blue-dark text-[25px] mr-[90px]'>About</a>
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
