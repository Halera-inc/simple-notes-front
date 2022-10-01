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
import {signIn} from "next-auth/react";
import Button from "../src/components/universalComponent/Button/Button";
import {isThereErrorOnLogin} from 'src/bll/slices/authSlice';
import {setIsAppFetching} from 'src/bll/slices/appSlice'
import {Spinner} from "../src/components/Spinner";


const Login = ({providers}: any) => {

    const router = useRouter()
    const loginError = useAppSelector(state => state.auth.loginError)
    const loader= useAppSelector(state=>state.app.isAppFetching)
    const dispatch = useAppDispatch()

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
                    <div className={s.cardC}>
                        <div className={s.cardBody}>
                            <div className={s.wrapperTitle}>
                                <h2 className={s.cardTitle}> Sign In</h2>
                                <div className={s.arrowIcon}>
                                    <Link href={"/"}>
                                        <ArrowBackIcon width={'2.5em'}
                                                       height={'2.5em'}
                                                       color={'#5590C1'}/>
                                    </Link>
                                </div>
                            </div>
                            <ProvidersButtons providers={providers}/>
                            <div className="flex items-center mb-8 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                <p className="text-center font-semibold mx-4 mb-0">Or</p>
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

                                <div className="card-actions justify-center relative">
                                    <Button title={'Login'}
                                            type={'submit'}
                                            style={{
                                                backgroundColor: "white",
                                                width: 200,
                                                height: 60,
                                                margin: '0 0 60px 0',
                                                fontSize: 20
                                            }}/>
                                    {loader ?  <Spinner size={'50px'} style={{
                                        position:"absolute",
                                        right:'19%',
                                        top:"4%",
                                    }}/>
                                    : ''}

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
