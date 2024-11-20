'use client'
import { FC } from 'react'
import {signIn} from "next-auth/react";
import {SubmitHandler, useForm} from "react-hook-form";
type FormValues = {
    login: string
    password: string
}

const Page:FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> =async (data) => {
        try {
            const login = data.login
            const password =data.password
            const result = await signIn('credentials', {
                redirect: false,
                login,
                password,
            });
            console.log(result)
            if (result&&result.error) {
                console.log(result.error);
            } else {
                // редирект после успешного входа
                // window.location.href = '/';
                console.log('Зашёл')
            }
        }catch (e){
        }
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div >
                    <h2 className='title'>Вход</h2>
                    <div >
                        <p>{}</p>
                        <input className='input' placeholder='Почта'
                               type='text' {...register("login", {required: true})} />
                        <input className='input' placeholder='Пароль'
                               type='password'  {...register("password", {required: true})} />
                        <input type="submit" value='Войти'/>
                    </div>
                </div>
            </form>
        </div>
    )
};
export default Page;