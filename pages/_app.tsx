import '../src/styles/globals.css'
import s from '../src/styles/App.module.css'
import type {AppProps} from 'next/app'
import {store} from '../src/bll/store'
import {Provider} from 'react-redux'
import Sidebar from "../src/components/Sidebar/Sidebar";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <div className={s.appWrapper}>
                <Sidebar/>
                <Component {...pageProps} />
            </div>

        </Provider>
    )
}

export default MyApp
