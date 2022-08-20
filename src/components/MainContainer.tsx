import NavItem from "./NavItem";
import {ReactNode} from "react";

type MainContainerTypeProps = {
    children: ReactNode
}


const MainContainer = (props: MainContainerTypeProps) => {

    return (
        <>
            <div className="navbar absolute left-50 bottom-0 border-2 border-red flex justify-center">
                <h1><b>DEV MENU:</b></h1>
                <NavItem  text={'Landing'} href={"/"}/>
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