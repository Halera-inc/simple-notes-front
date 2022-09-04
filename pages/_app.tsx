import '../src/styles/globals.css'
import type {AppProps} from 'next/app'
import {store} from '../src/bll/store'
import {Provider} from 'react-redux'
import Sidebar from "../src/components/Sidebar/Sidebar";
import {useRouter} from "next/router";
import {ThemeProvider} from "next-themes";
import {useEffect} from "react";
import {authAPI, notesAPI} from "../src/api/notes-api";

function MyApp({Component, pageProps}: AppProps) {

    useEffect(()=>{

    },[])


    const router = useRouter()

    return (
        <ThemeProvider enableSystem={true} attribute="class">
        <Provider store={store}>
            <div>
                {router.pathname === '/'
                || router.pathname === '/signIn'
                || router.pathname === '/registration'
                || router.pathname === '/about'
                || router.pathname === '/404'

                    ? null
                    : <Sidebar/>}
                <div className='flex flex-col bg-white dark:bg-black'>
                    <Component {...pageProps} />
                </div>

            </div>
        </Provider>
        </ThemeProvider>
    )
}

export default MyApp
