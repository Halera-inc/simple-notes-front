import React, {useEffect, useState} from 'react';
import MainContainer from "../src/components/MainContainer";
import {useFormik} from "formik";
import s from './../src/styles/SignIn.module.css'
import UserIcon from "../src/assets/images/UserIcon";
import KeyIcon from "../src/assets/images/KeyIcon";
import ArrowBackIcon from "../src/assets/images/ArrowBackIcon";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "../src/utils/hooks";
import {useRouter} from "next/router";
import {getProviders, getSession, signIn} from "next-auth/react";
import Button from "../src/components/universalComponent/Button/Button";
import { isThereErrorOnLogin} from 'src/bll/slices/authSlice';
import {setIsAppFetching} from 'src/bll/slices/appSlice'
import {Spinner} from "../src/components/Spinner";
import {useTheme} from "next-themes";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import GithubIcon from "../src/assets/images/GithubIcon";
import GoogleIcon from "../src/assets/images/GoogleIcon";

type FormikErrorType = {
    email: string
    password: string
}

const Login = ({providers}: any) => {

    const router = useRouter()
    const loginError = useAppSelector(state => state.auth.loginError)
    const loader = useAppSelector(state => state.app.isAppFetching)
    const dispatch = useAppDispatch()

    const {systemTheme, theme, setTheme} = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    const RenderGoogleIcon = () => {
        if (!mounted) return undefined;
        const currentTheme = theme === "system" ? systemTheme : theme;
        if (currentTheme === 'dark') {
            return (
                <GoogleIcon width={'2em'} height={'2em'} className="sm:w-[1.5em] sm:h-[1.5em]"
                            color={'#ffffff'}/>
            )
        } else {
            return (
                <GoogleIcon width={'2em'} height={'2em'} className="sm:w-[1.5em] sm:h-[1.5em]"
                            color={'#5590C1'}/>
            )
        }
    }

    const RenderGithubIcon = () => {
        if (!mounted) return undefined;
        const currentTheme = theme === "system" ? systemTheme : theme;
        if (currentTheme === 'dark') {
            return (
                <GithubIcon width={'2.5em'} height={'2.5em'} className="sm:w-[2em] sm:h-[2em]"
                            color={'#ffffff'}/>
            )
        } else {
            return (
                <GithubIcon width={'2.5em'} height={'2.5em'} className="sm:w-[2em] sm:h-[2em]"
                            color={'#5590C1'}/>
            )
        }
    }

    const RenderUserIcon = () => {
        if (!mounted) return undefined;
        const currentTheme = theme === "system" ? systemTheme : theme;
        if (currentTheme === 'dark') {
            return (
                <UserIcon width={'3em'} height={'3em'} className="sm:w-[2em] sm:h-[2em] sl:w-[1.7em] sl:h-[1.7em]"
                          color={loginError ? '#F06464' : '#ffffff'}/>
            )
        } else {
            return (
                <UserIcon width={'3em'} height={'3em'} className="sm:w-[2.5em] sm:h-[2.5em] sl:w-[1.7em] sl:h-[1.7em]"
                          color={loginError ? '#F06464' : '#5590C1'}/>
            )
        }
    }

    const RenderKeyIcon = () => {
        if (!mounted) return null;
        const currentTheme = theme === "system" ? systemTheme : theme;
        if (currentTheme === 'dark') {
            return (
                <KeyIcon width={'3em'} height={'3em'} className="sm:w-[2em] sm:h-[2em] sl:w-[1.7em] sl:h-[1.7em]"
                         color={loginError ? '#F06464' : '#ffffff'}/>
            )
        } else {
            return (
                <KeyIcon width={'3em'} height={'3em'} className="sm:w-[2em] sm:h-[2em] sl:w-[1.7em] sl:h-[1.7em]"
                         color={loginError ? '#F06464' : '#5590C1'}/>
            )
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async values => {
            dispatch(setIsAppFetching(true));
            try {
                await signIn("credentials", {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                    callbackUrl: `${window.location.origin}`,
                })
                redirectToNotes()
                dispatch(isThereErrorOnLogin(true))
            } catch (err) {
                dispatch(isThereErrorOnLogin(false))


                } finally {
                    dispatch(setIsAppFetching(false))
                }

            formik.resetForm();
        },
    })

    const redirectToNotes = () => {
        const {pathname} = router;
        if (pathname === "/login") {
            typeof window !== 'undefined' && router.push("/notes");
        }
    };


    const resetHandler = () => {
        dispatch(isThereErrorOnLogin(false));
        formik.resetForm();
    }

    const ProvidersButtons = ({providers}: any) => (
        <div className="flex flex-col w-full">
            {providers && Object.values(providers).map(
                (provider: any) =>
                    provider.name !== "Credentials" && (
                        <div className={s.providerButton} key={provider.name}>
                            <Button
                                icon={provider.name === 'Google'
                                    ? RenderGoogleIcon()
                                    : RenderGithubIcon()}
                                className="dark:bg-black dark:border-white  dark:text-white pl-[15%] sm:h-[50px] sm:w-[350px] sm:text-[15px]
                                sl:w-[280px] ms:w-[230px] ms:pl-[5px] "
                                title={`Sign in with ${provider.name}`}
                                callback={() => signIn(provider.id)}
                                style={{
                                    justifyContent: "flex-start",
                                    backgroundColor: "white",
                                    width: 428,
                                    height: 60,
                                    margin: 0,
                                    fontSize: 20,

                                }}/>

                        </div>))}
        </div>
    );

    return (
        <MainContainer>
            <div className={s.singnInBlock}>
                <div className={s.wrapperCard}>
                    <div
                        className=" bg-blue dark:bg-grey  card shadow-xl rounded-none border-solid border-[1px] border-blue-dark">
                        <div className={s.cardBody}>
                            <div className={s.titleWrapper}>
                                <h2 className={`dark:text-white ${s.title} `}> Sign
                                    In</h2>
                                <div className={s.arrowIcon}>
                                    <Link href={"/"}>
                                        <ArrowBackIcon width={'2.5em'}
                                                       height={'2.5em'}
                                                       color={'#5590C1'} className="dark:text-white sm:w-[2em]  sm:h-[2em] sl:w-[1.7em] sl:h-[1.7em] ms:mt-[5px]"/>
                                    </Link>
                                </div>
                            </div>
                            <ProvidersButtons providers={providers}/>
                            <div
                                className="flex items-center text-blue-dark  mb-8 before:flex-1 before:border-t before:border-gray-300  text-blue-dark
                                 before:mt-0.5 after:flex-1  text-blue-dark after:border-t after:border-gray-300 after:mt-0.5 sm:mb-[15px]">
                                <p className=" text-center text-blue-dark  font-semibold mx-4 mb-0">Or</p>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className={`${s.formControl} ${s.one}`}>
                                    <label className={s.label}>
                                        {RenderUserIcon()}
                                        <input type="text" id='email' placeholder="email"
                                               className={loginError ? s.errorInput :  `${s.inputI} dark:bg-black dark:border-none`}
                                               {...formik.getFieldProps('email')}/>
                                    </label>
                                    {formik.touched.email && formik.errors.email}
                                </div>
                                <div className={`${s.formControl} ${s.two}`}>
                                    <label className={s.label}>
                                        {RenderKeyIcon()}
                                        <input type="password" id='password'
                                               placeholder="password"
                                               className={loginError ? s.errorInput :  `${s.inputI} dark:bg-black dark:border-none`}
                                               {...formik.getFieldProps('password')}/>
                                    </label>
                                    {loginError ?
                                        <div className={s.errorText}>Incorrect login or
                                            password!</div> : null}
                                </div>

                                <div className="card-actions justify-center relative">
                                    <Button className="dark:bg-black dark:text-white dark:border-white lg:mb-[20px] sm:w-[160px]
                                    sm:h-[50px] ms:w-[140px]  ms:text-[17px]"
                                            title={'Login'}
                                            type={'submit'}
                                            style={{
                                                backgroundColor: "white",
                                                width: 200,
                                                height: 60,
                                                margin: '0 0 60px 0',
                                                fontSize: 20
                                            }}/>
                                    {loader ? <Spinner size={'50px'} className='lg:right-[15%] lg:top-[6%] sb:right-[9%] sb:top-[2%] ms:right-[4%]'
                                                       style={{
                                            position: "absolute",
                                            right: '19%',
                                            top: "4%",
                                        }}/>
                                        : ''}

                                    {/*Надо доработать, isInitialized опять нет (Ваня)*/}
                                    {/*/!*{!isInitialized && }*/}
                                </div>
                            </form>
                            <Link href={"/register"}><p
                                className="dark:text-white font-medium text-[15px] leading-[18px] mb-[15px] text-blue-dark cursor-pointer ms:text-[13px] ms:mb-[10px]">Registration</p>
                            </Link>
                            <p onClick={resetHandler}
                               className=" font-medium text-[15px] leading-[18px] mb-[15px] text-blue-dark cursor-pointer ms:text-[13px] ms:mb-[10px]">Reset
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
    // console.log(session)
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
