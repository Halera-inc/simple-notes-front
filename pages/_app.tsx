import '../src/styles/globals.css'
import type {AppProps} from 'next/app'
import {store} from '../src/bll/store'
import {Provider} from 'react-redux'
import Sidebar from "../src/components/Sidebar/Sidebar";
import {useRouter} from "next/router";

function MyApp({Component, pageProps}: AppProps) {

    const router = useRouter()

    return (
        <Provider store={store}>
            <div >
                {router.pathname === '/'
                || router.pathname === '/signIn'
                || router.pathname === '/registration'
                || router.pathname === '/about'
                || router.pathname === '/404'
                    ? null
                    : <Sidebar/>}
                <Component {...pageProps} />
            </div>
        </Provider>
    )
}

export default MyApp
