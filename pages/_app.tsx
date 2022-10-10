import '../src/styles/globals.css'
import type {AppProps} from 'next/app'
import {store} from '../src/bll/store'
import {Provider} from 'react-redux'
import {ThemeProvider} from "next-themes";
import Sidebar from "../src/components/Sidebar/Sidebar";
import {SessionProvider} from 'next-auth/react';
import {HTML5Backend} from "react-dnd-html5-backend";
import { DndProvider } from 'react-dnd';


function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {

    return (
        <DndProvider backend={HTML5Backend}>
            <SessionProvider session={session}>
                <ThemeProvider enableSystem={true} attribute="class">
                    <Provider store={store}>
                        <div className="bg-white dark:bg-black">
                            <Sidebar/>
                            <Component {...pageProps} />
                        </div>
                    </Provider>
                </ThemeProvider>
            </SessionProvider>
        </DndProvider>

    )
}

export default MyApp
