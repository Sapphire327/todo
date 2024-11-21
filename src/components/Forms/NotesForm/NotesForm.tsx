'use client'
import {FC, useEffect} from 'react'
import {useSignUpMutation} from "@/store/features/registration/registration";
import {SubmitHandler, useForm} from "react-hook-form";
import {UserDto} from "@/types/dto";
import styles from '../Form.module.scss'
import {getMessageFromError} from "@/helpers/errorPredicates";
import clsx from "clsx";
import {useRouter} from "next/navigation";

const RegisterForm:FC = () => {
    const [regMutate,{error,status,isSuccess,isError}] = useSignUpMutation()
    const { register, handleSubmit,formState: { errors } } = useForm<UserDto>();
    const onSubmit: SubmitHandler<UserDto> =async (data) => {
        try{await regMutate(data).unwrap();}
        catch (e){}
    }
    const router = useRouter()

    useEffect(()=>{
        if(isSuccess)router.push('/sign-in')
    },[isSuccess])
    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className='title'>Регистрация</h2>
            <div className={styles.formBody}>
                <p className={styles.error}>{errors.nickname?.message||errors.login?.message||errors.password?.message} {getMessageFromError(error)} </p>
                <input className='input' placeholder='Имя'
                       type='nickname' {...register("nickname", {required: true,minLength:{value:6,message:'Никнейм должен быть не меньше 6 символов'}})} />
                <input className='input' placeholder='Логин'
                       type='text' {...register("login", {required: true,minLength:{value:6,message:'Логин должен быть не меньше 6 символов'}})} />
                <input className='input' placeholder='Пароль'
                       type='password'  {...register("password", {required: true,minLength:{value:6,message:'Пароль должен быть не меньше 6 символов'}})} />
                <input type="submit" className={clsx('button',styles.formBtn)} value='зарегистрироваться'/>
            </div>
        </form>
    )
};
export default RegisterForm;