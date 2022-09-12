import React from 'react';
import s from "src/styles/Settings.module.css";
import Button from "src/components/universalComponent/Button/Button";
import {useAppDispatch, useAppSelector} from "src/utils/hooks";
import {updateUserData} from "src/bll/slices/profileSlice";
import {SubmitHandler, useForm} from "react-hook-form";

const InputForm = () => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.profile.user)
    const {register, handleSubmit} = useForm<{ username: string, email: string, country: string }>({
        defaultValues: {
            username: userData.username,
            email: userData.email,
            country: userData.country
        }
    })

    const onSubmit: SubmitHandler<{ username: string, email: string, country: string }> = (values) => {
        dispatch(updateUserData(values))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={s.edit}>
                <ul className={s.editMyProfile}>
                    <label>
                        <li>Username: <input
                            {...register('username')}
                            placeholder="Enter UserName"
                            className={s.inf}/></li>
                    </label>
                    <label>
                        <li>Email: <input
                            disabled={true}
                            {...register('email')}
                            placeholder="Enter New Email"
                            className={s.inf}/></li>
                    </label>
                    <label>
                        <li>Country: <input
                            {...register('country')}
                            placeholder="Change Country"
                            className={s.inf}/>
                        </li>
                    </label>
                </ul>

                <Button title={'Save'} callback={onSubmit}/>
            </div>
        </form>
    );
};

export default InputForm;
