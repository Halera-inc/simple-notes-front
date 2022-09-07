import '../src/styles/globals.css'
import type {AppProps} from 'next/app'
import {store} from '../src/bll/store'
import {Provider} from 'react-redux'
import {ThemeProvider} from "next-themes";
import {RouteGuard} from "../src/components/RouteGuard";

function MyApp({Component, pageProps}: AppProps) {

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
