import React, {FunctionComponent} from 'react';
import {LayoutProps} from "./Layout.props";
import style from "./Layout.module.css";
import cn from "classnames";
import {Header} from "./Header/Header";
import {Sidebar} from "./Sidebar/Sidebar";
import {Footer} from "./Footer/Footer";
import {AppContextProvider, IAppContext} from "../context/app.context";

const Layout = ({children}: LayoutProps): JSX.Element => {
    return (
        <div className={style.wrapper}>
            <Header className={style.header}/>
            <Sidebar className={style.sidebar}/>
            <div className={style.body}>
                {children}
            </div>
            <Footer className={style.footer}/>
        </div>
    );
};

export const widthLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
    return function widthLayoutComponent(props: T): JSX.Element {
        return (
            <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
                <Layout>
                    <Component {...props}/>
                </Layout>
            </AppContextProvider>

        )
    }
}
