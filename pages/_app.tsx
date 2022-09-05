import '../src/styles/globals.css'
import type {AppProps} from 'next/app'
import {store} from '../src/bll/store'
import {Provider} from 'react-redux'
import Sidebar from "../src/components/Sidebar/Sidebar";
import {useRouter} from "next/router";
import {ThemeProvider} from "next-themes";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../src/utils/hooks";
import {me} from "../src/bll/slices/authSlice";
import {RouteGuard} from "../src/components/RouteGuard";

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter()

    return (
        <ThemeProvider enableSystem={true} attribute="class">
            <Provider store={store}>
                <RouteGuard>
                    <Component {...pageProps} />
                </RouteGuard>
            </Provider>
        </ThemeProvider>
    )
}

export default MyApp
