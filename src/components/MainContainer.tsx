import NavItem from "./NavItem";
import {ReactNode} from "react";
import Header from "./Header/Header";
import {useRouter} from "next/router";
import {APP_ROOTS} from "../utils/getPageName";

type MainContainerTypeProps = {
    children: ReactNode
}

export const headerRoots = [APP_ROOTS.HOME_PAGE, APP_ROOTS.MY_NOTES_PAGE, APP_ROOTS.SETTINGS_PAGE]


const MainContainer = (props: MainContainerTypeProps) => {

    const currentRoute = useRouter().pathname as APP_ROOTS

    return (
        <>
            {headerRoots.includes(currentRoute) ? <Header/> : null}
            <div className="navbar absolute left-50 bottom-0 border-2 border-red flex justify-center">
                <h1><b>DEV MENU:</b></h1>
                <NavItem text={'Landing'} href={"/"}/>
                <NavItem text={'My notes'} href={"/notes"}/>
                <NavItem text={'Settings'} href={"/settings"}/>
                <NavItem text={'About'} href={"/about"}/>
                <NavItem text={'404'} href={"/404"}/>
                <NavItem text={'Registration'} href={"/registration"}/>
                <NavItem text={'SingIn'} href={"/signIn"}/>
            </div>
            <div>{props.children}</div>
        </>
    );
};

export default MainContainer;