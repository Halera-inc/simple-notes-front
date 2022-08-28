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
            <div>{props.children}</div>
        </>
    );
};

export default MainContainer;
