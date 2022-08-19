import NavItem from "./NavItem";
import {ReactNode} from "react";

type MainContainerTypeProps = {
    children: ReactNode
}


const MainContainer = (props: MainContainerTypeProps) => {
    return (
        <>
            <div className="navbar">
                <NavItem text={'Landing'} href={"/"}/>
                <NavItem text={'My notes'} href={"/notes"}/>
                <NavItem text={'Settings'} href={"/settings"}/>
                <NavItem text={'About'} href={"/about"}/>
                <NavItem text={'404'} href={"/404"}/>
            </div>
            <div>{props.children}</div>
        </>
    );
};

export default MainContainer;