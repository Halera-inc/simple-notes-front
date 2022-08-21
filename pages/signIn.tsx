import React from 'react';
import MainContainer from "../src/components/MainContainer";
import {useFormik} from "formik";
import s from './../src/styles/SignIn.module.css'
import UserIcon from "../src/assets/images/UserIcon";
import KeyIcon from "../src/assets/images/KeyIcon";
import ArrowBackIcon from "../src/assets/images/ArrowBackIcon";
import Link from "next/link";

const SignIn = () => {

    type FormikErrorType = {
        username?: string
        password?: string


    }
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',


        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.username) {
                errors.username = 'Required';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 7) {
                errors.password = 'Password must be more than 7 characters...'
            }
            return errors;
        },
        onSubmit: values => {
            // dispatch(setRegistrTC(values));
            formik.resetForm();
        },
    })
    return (
        <MainContainer>
            <div className={s.wrapperCard}>
                <div className={s.cardC}>
                    <div className={s.cardBody}>
                        <div className={s.wrapperTitle}>
                            <h2 className={s.cardTitle}> Sing In</h2>
                            <div className={s.arrowIcon}>
                                <Link href={"/"}>
                                <ArrowBackIcon width={'2.5em'} height={'2.5em'} color={'#5590C1'}/>
                                </Link>
                            </div>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className={`${s.formControl} ${s.one}`}>
                                <label className={s.label}>
                                    <UserIcon width={'3em'} height={'3em'} color={!formik.errors.username ?'#5590C1':'#F06464'}/>
                                    <input type="text" id='username' placeholder="username"
                                           className={!formik.errors.username ? s.inputI: s.errorInput}
                                           {...formik.getFieldProps('username')}/>
                                </label>
                                {formik.touched.username && formik.errors.username ?
                                    <div style={{color: "red",marginTop:'10px'}}>{formik.errors.username}</div> : null}
                            </div>

                            <div className={`${s.formControl} ${s.two}`}>
                                <label className={s.label}>
                                    <KeyIcon width={'3em'} height={'3em'} color={!formik.errors.password ?'#5590C1':'#F06464'}/>
                                    <input type="text" id='password' placeholder="password"
                                           className={!formik.errors.password ? s.inputI: s.errorInput}
                                           {...formik.getFieldProps('password')}/>
                                </label>
                                {formik.touched.password && formik.errors.password ?
                                    <div style={{color: "red",marginTop:'10px'}}>{formik.errors.password}</div>: null}
                            </div>

                            <div className="card-actions justify-center">
                                <button className={s.btnB}>Login</button>
                            </div>
                        </form>
                        <p className={s.text}>Registration</p>
                        <p className={s.text}>Reset password</p>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default SignIn;