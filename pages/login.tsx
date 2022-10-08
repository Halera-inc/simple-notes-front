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
import {isThereErrorOnLogin} from 'src/bll/slices/authSlice';
import {setIsAppFetching} from 'src/bll/slices/appSlice'
import {Spinner} from "../src/components/Spinner";
import {useTheme} from "next-themes";
import {GetServerSideProps, GetServerSidePropsContext} from "next";


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

    const RenderUserIcon = () => {
        if (!mounted) return null;
        const currentTheme = theme === "system" ? systemTheme : theme;
        if (currentTheme === 'dark') {
            return (
                <UserIcon width={'3em'} height={'3em'}
                          color={loginError ? '#F06464' : '#ffffff'}/>
            )
        } else {
            return (
                <UserIcon width={'3em'} height={'3em'}
                          color={loginError ? '#F06464' : '#5590C1'}/>
            )
        }
    }

    const RenderKeyIcon = () => {
        if (!mounted) return null;
        const currentTheme = theme === "system" ? systemTheme : theme;
        if (currentTheme === 'dark') {
            return (
                <KeyIcon width={'3em'} height={'3em'}
                         color={loginError ? '#F06464' : '#ffffff'}/>
            )
        } else {
            return (
                <KeyIcon width={'3em'} height={'3em'}
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
            const {error}: any = signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
                callbackUrl: `${window.location.origin}`,
            })
            dispatch(setIsAppFetching(false))
            if (error) {
                redirectToHome()
                dispatch(isThereErrorOnLogin(false))
            } else {
                dispatch(isThereErrorOnLogin(true))
            }
            formik.resetForm();
        },
    })
    const inputI = "h-[60px] ml-[27px] w-[428px] bg-white dark:bg-black dark:border-none word-break: break-all  input  input-bordered input-info placeholder:text-blue-dark  rounded-none  text-blue-dark   text-xl"

    const redirectToHome = () => {
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
                            <button
                                onClick={() => signIn(provider.id)}
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-400 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <span
                                    className="absolute inset-y-0 left-0 flex items-center pl-3">
                                </span>{`Sign in with ${provider.name}`}
                            </button>
                        </div>))}
        </div>
    );

    return (
        <MainContainer>
            <div className={s.singnInBlock}>
                <div className={s.wrapperCard}>
                    <div
                        className={" bg-blue dark:bg-grey  card shadow-xl rounded-none border-solid border-[1px] border-blue-dark"}>
                        <div className={s.cardBody}>
                            <div className={"relative"}>
                                <h2 className={"dark:text-white font-medium text-[50px] mb-[73px] card-title flex justify-center text-blue-dark"}> Sign
                                    In</h2>
                                <div className={s.arrowIcon}>
                                    <Link href={"/"}>
                                        <ArrowBackIcon width={'2.5em'}
                                                       height={'2.5em'}
                                                       color={'#5590C1'} className={"dark:text-white"}/>
                                    </Link>
                                </div>
                            </div>
                            <ProvidersButtons providers={providers}/>
                            <div
                                className="flex items-center text-blue-dark  mb-8 before:flex-1 before:border-t before:border-gray-300  text-blue-dark
                                 before:mt-0.5 after:flex-1  text-blue-dark after:border-t after:border-gray-300 after:mt-0.5">
                                <p className=" text-center text-blue-dark  font-semibold mx-4 mb-0">Or</p>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className={`${s.formControl} ${s.one}`}>
                                    <label className={s.label}>
                                        {RenderUserIcon()}
                                        <input type="text" id='email' placeholder="email"
                                               className={loginError ? s.errorInput : inputI}
                                               {...formik.getFieldProps('email')}/>
                                    </label>
                                    {formik.touched.email && formik.errors.email}
                                </div>
                                <div className={`${s.formControl} ${s.two}`}>
                                    <label className={s.label}>
                                        {RenderKeyIcon()}
                                        <input type="password" id='password'
                                               placeholder="password"
                                               className={loginError ? s.errorInput : inputI}
                                               {...formik.getFieldProps('password')}/>
                                    </label>
                                    {loginError ?
                                        <div className={s.errorText}>Incorrect login or
                                            password!</div> : null}
                                </div>

                                <div className="card-actions justify-center relative">
                                    <Button className="dark:bg-black dark:text-white dark:border-white"
                                            title={'Login'}
                                            type={'submit'}
                                            style={{
                                                backgroundColor: "white",
                                                width: 200,
                                                height: 60,
                                                margin: '0 0 60px 0',
                                                fontSize: 20
                                            }}/>
                                    {loader ? <Spinner size={'50px'} style={{
                                            position: "absolute",
                                            right: '19%',
                                            top: "4%",
                                        }}/>
                                        : ''}

                                    {/*Надо доработать, isInitialized опять нет (Ваня)*/}
                                    {/*{!isInitialized && <Spinner size={'60px'}*/}
                                    {/*                            style={{fill: 'blue'}}*/}
                                    {/*                            className={'absolute right-32'}/>}*/}
                                </div>
                            </form>
                            <Link href={"/register"}><p
                                className={"dark:text-white font-medium text-[15px] leading-[18px] mb-[15px] text-blue-dark cursor-pointer"}>Registration</p>
                            </Link>
                            <p onClick={resetHandler}
                               className={" font-medium text-[15px] leading-[18px] mb-[15px] text-blue-dark cursor-pointer"}>Reset
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