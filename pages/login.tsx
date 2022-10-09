import React from 'react';
import MainContainer from "../src/components/MainContainer";
import {useFormik} from "formik";
import s from './../src/styles/SignIn.module.css'
import UserIcon from "../src/assets/images/UserIcon";
import KeyIcon from "../src/assets/images/KeyIcon";
import ArrowBackIcon from "../src/assets/images/ArrowBackIcon";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "../src/utils/hooks";
import {useRouter} from "next/router";
import {getProviders, getSession, signIn, useSession} from "next-auth/react";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import Button from "../src/components/universalComponent/Button/Button";
import GithubIcon from "../src/assets/images/GithubIcon";
import GoogleIcon from "../src/assets/images/GoogleIcon";
import {isThereErrorOnLogin} from "../src/bll/slices/authSlice";


const Login = ({providers, session}: any) => {
    const router = useRouter()
    const loginError = useAppSelector<boolean>(state => state.auth.loginError)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async values => {
            //@ts-ignore
            const {error} = signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
                callbackUrl: `${window.location.origin}`,
            })
            if (error) {
                redirectToHome()
                dispatch(isThereErrorOnLogin({value: false}))

            } else {
                dispatch(isThereErrorOnLogin({value: true}))
            }
            formik.resetForm()
        },
    })

    const redirectToHome = () => {
        const {pathname} = router;
        if (pathname === "/login") {
            typeof window !== 'undefined' && router.push("/notes");
        }
    };

    const resetHandler = () => {
        dispatch(isThereErrorOnLogin({value: false}));
        formik.resetForm();
    }


    const ProvidersButtons = ({providers}: any) => (
        <div className="flex flex-col w-full">
            {Object.values(providers).map(
                (provider: any) =>
                    provider.name !== "Credentials" && (
                        <div className={s.providerButton} key={provider.name}>
                            {provider.name === 'Google' ?
                                <GoogleIcon width={'3em'} height={'3em'}
                                            color={'#5590C1'}/>
                                : <GithubIcon width={'4em'} height={'4em'}
                                              color={'#5590C1'}/>}
                            <Button
                                title={`Sign in with ${provider.name}`}
                                callback={() => signIn(provider.id)}
                                style={{
                                    justifyContent: "flex-start",
                                    backgroundColor: "white",
                                    width: 428,
                                    height: 60,
                                    margin: 0,
                                    fontSize: 20
                                }}/>
                        </div>
                    )
            )}
        </div>
    );

    return (
        <MainContainer>
            <div className={s.singnInBlock}>
                <div className={s.wrapperCard}>
                    <div className={s.cardC}>
                        <div className={s.cardBody}>
                            <div className={s.wrapperTitle}>
                                <h2 className={s.cardTitle}> Sign In</h2>
                                <div className={s.arrowIcon}>
                                    <Link href={"/"}>
                                        <ArrowBackIcon width={'2.5em'} height={'2.5em'}
                                                       color={'#5590C1'}/>
                                    </Link>
                                </div>
                            </div>

                            <ProvidersButtons providers={providers}/>

                            <div
                                className="flex items-center text-blue-dark mb-8 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                            >
                                <p className=" text-blue-dark text-center font-semibold mx-4 mb-0">Or</p>
                            </div>

                            <form onSubmit={formik.handleSubmit}>
                                <div className={`${s.formControl} ${s.one}`}>
                                    <label className={s.label}>
                                        <UserIcon width={'3em'} height={'3em'}
                                                  color={loginError ? '#F06464' : '#5590C1'}/>
                                        <input type="text" id='email' placeholder="email"
                                               className={loginError ? s.errorInput : s.inputI}
                                               {...formik.getFieldProps('email')}/>
                                    </label>
                                    {formik.touched.email && formik.errors.email}

                                </div>

                                <div className={`${s.formControl} ${s.two}`}>
                                    <label className={s.label}>
                                        <KeyIcon width={'3em'} height={'3em'}
                                                 color={loginError ? '#F06464' : '#5590C1'}/>
                                        <input type="password" id='password'
                                               placeholder="password"
                                               className={loginError ? s.errorInput : s.inputI}
                                               {...formik.getFieldProps('password')}/>
                                    </label>
                                    {loginError ?
                                        <div className={s.errorText}>Incorrect login or
                                            password!</div> : null}
                                </div>

                                <div className="card-actions justify-center">
                                    <Button title={'Login'}
                                            type={'submit'}
                                            style={{
                                                backgroundColor: "white",
                                                width: 200,
                                                height: 60,
                                                margin: '0 0 60px 0',
                                                fontSize: 20
                                            }}/>
                                    {/*Надо доработать, isInitialized опять нет (Ваня)*/}
                                    {/*{!isInitialized && <Spinner size={'60px'}*/}
                                    {/*                            style={{fill: 'blue'}}*/}
                                    {/*                            className={'absolute right-32'}/>}*/}
                                </div>
                            </form>
                            <Link href={"/register"}><p
                                className={s.text}>Registration</p></Link>
                            <p onClick={resetHandler} className={s.text}>Reset
                                password</p>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    )
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);
    console.log(session)
    if (session) {
        return {
            redirect: {destination: '/notes'},
            props: {}
        }
    }
    return {
        props: {
            providers: await getProviders(),
            session
        }
    }
}


//hbighohbbboikgfpihbiodoieshbioshbioeahb удалить !-)

