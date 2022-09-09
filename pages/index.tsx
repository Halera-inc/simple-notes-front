import type {NextPage} from 'next'
import {useRouter} from "next/router";
import {signIn, signOut, useSession} from "next-auth/react";

const Home: NextPage = () => {

    const router = useRouter()
    const {data: session} = useSession()

    return (
        <div>
            {!session && (
                <>
                    Not signed in <br/>
                    <button onClick={() => signIn()}>Sign in</button>
                </>
            )}
            {session && (
                <>
                    Signed in as {session.user && session.user.email} <br/>
                    <div>
                        You can now access out super secret pages
                    </div>
                    <button onClick={() => signOut()}>Sign out</button>

                </>
            )}
        </div>
    )


//
// <MainContainer>
//     <div className="bg-white dark:bg-black">
//         <LandingPage/>
//     </div>
// </MainContainer>

}

export default Home
