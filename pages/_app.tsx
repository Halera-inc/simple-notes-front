import '../src/styles/globals.css'
import type {AppProps} from 'next/app'
import {store} from '../src/bll/store'
import {Provider} from 'react-redux'
import {ThemeProvider} from "next-themes";
import {getSession, SessionProvider} from "next-auth/react"
import Sidebar from "../src/components/Sidebar/Sidebar";
import {GetServerSideProps, GetServerSidePropsContext} from "next";


function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {

    return (
        <SessionProvider session={session}>
            <ThemeProvider enableSystem={true} attribute="class">
                <Provider store={store}>
                        <Sidebar/>
                        <Component {...pageProps} />
                </Provider>
            </ThemeProvider>
        </SessionProvider>

    )
}

export default MyApp
