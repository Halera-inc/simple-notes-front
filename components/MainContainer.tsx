import A from "./A";
import {ReactNode} from "react";

type MainContainerTypeProps={
    children:ReactNode
}


const MainContainer = (props:MainContainerTypeProps) => {
    return (
        <>
            <div className="navbar">
                <A text={'Landing'} href={"/"}/>
                <A text={'My notes'} href={"/notes"}/>
                <A text={'Settings'} href={"/settings"}/>
                <A text={'My account'} href={"/myAccount"}/>
                <A text={'404'} href={"/404"}/>
            </div>
            <div>{props.children}</div>
        </>
    );
};

export default MainContainer;