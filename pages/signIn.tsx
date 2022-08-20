import React from 'react';
import MainContainer from "../src/components/MainContainer";
import {useFormik} from "formik";

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
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
                errors.username = 'Invalid email address';
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
            <div className={'flex justify-center'}>
                <div className="card w-96 bg-base-100 shadow-xl ">
                    <div className="card-body">
                        <h2 className="card-title"> Sing In</h2>
                        <div className="form-control">
                            <label className="label">
                                <input type="text" id='username'  placeholder="username"
                                       className="input input-bordered input-info w-full max-w-xs"/>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <input type="text" id='password'  placeholder="password"
                                       className="input input-bordered input-info w-full max-w-xs"/>
                            </label>
                        </div>

                        <div className="card-actions justify-center">
                            <button className="btn btn-outline btn-info">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default SignIn;