import '../src/styles/globals.css'
import type {AppProps} from 'next/app'
import {store} from '../src/bll/store'
import {Provider} from 'react-redux'
import {ThemeProvider} from "next-themes";
import {SessionProvider} from "next-auth/react"


function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {

    return (
        <SessionProvider session={session}>
            <ThemeProvider enableSystem={true} attribute="class">
                <Provider store={store}>
                        <Component {...pageProps} />
                </Provider>
            </ThemeProvider>
        </SessionProvider>

    )
}

export default MyApp
