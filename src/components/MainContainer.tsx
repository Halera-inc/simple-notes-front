import {ReactNode} from "react";

type MainContainerTypeProps = {
    children: ReactNode
}


const MainContainer = (props: MainContainerTypeProps) => {

    return (
        <>
            <div>{props.children}</div>
        </>
    );
};

export default MainContainer;
