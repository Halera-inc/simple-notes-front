import React, {useEffect, useState} from 'react';
import MainContainer from "../src/components/MainContainer";
import {useFormik} from "formik";
import s from './../src/styles/SignIn.module.css'
import UserIcon from "../src/assets/images/UserIcon";
import KeyIcon from "../src/assets/images/KeyIcon";
import ArrowBackIcon from "../src/assets/images/ArrowBackIcon";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "../src/utils/hooks";
import {loginUser, notErrorlogin} from "../src/bll/slices/authSlice";
import {useRouter} from "next/router";

const Login = () => {

    const router = useRouter()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const notError = useAppSelector(state => state.auth.notErrorlogin)
    const dispatch = useAppDispatch()

    type FormikErrorType = {
        email?: string
        password?: string

    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',


        },
        onSubmit: values => {
            dispatch(loginUser({email: values.email, password: values.password}));
            formik.resetForm();
        },
    })

    const resetHandler = () => {
        dispatch(notErrorlogin(true));
        formik.resetForm();
    }

    typeof window !== 'undefined' && isLoggedIn && router.push('/notes')

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
                            <form onSubmit={formik.handleSubmit}>
                                <div className={`${s.formControl} ${s.one}`}>
                                    <label className={s.label}>
                                        <UserIcon width={'3em'} height={'3em'}
                                                  color={notError ? '#5590C1' : '#F06464'}/>
                                        <input type="text" id='email' placeholder="email"
                                               className={notError ? s.inputI : s.errorInput}
                                               {...formik.getFieldProps('email')}/>
                                    </label>
                                    {formik.touched.email && formik.errors.email}

                                </div>

                                <div className={`${s.formControl} ${s.two}`}>
                                    <label className={s.label}>
                                        <KeyIcon width={'3em'} height={'3em'}
                                                 color={notError ? '#5590C1' : '#F06464'}/>
                                        <input type="password" id='password'
                                               placeholder="password"
                                               className={notError ? s.inputI : s.errorInput}
                                               {...formik.getFieldProps('password')}/>
                                    </label>
                                    {!notError ?
                                        <div className={s.errorText}>Incorrect login or
                                            password!</div> : null}
                                </div>

                                <div className="card-actions justify-center">
                                    <button type={'submit'} className={s.btnB}>Login
                                    </button>
                                </div>
                            </form>
                            <Link href={"/registration"}><p
                                className={s.text}>Registration</p></Link>
                            <p onClick={resetHandler} className={s.text}>Reset
                                password</p>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>

    )
        ;
};

export default Login;