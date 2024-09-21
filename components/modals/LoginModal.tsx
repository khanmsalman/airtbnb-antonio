"use client"
import React, { useCallback, useState } from 'react'
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '../../hooks/useRegisterModal'
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { FcGoogle } from 'react-icons/fc';
import useLoginModal from '@/hooks/useLoginModal';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const RegisterModal = useRegisterModal();
    const LoginModal = useLoginModal()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);


    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
             email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then((callback )=>{
            setIsLoading(false);

            if(callback?.ok){
                toast.success('Login successfully');
                router.refresh();
                LoginModal.onClose()
            }

            if(callback?.error){
                toast.error(callback.error)
            }
        })
 
    }


    const toggle = useCallback(()=>{
        LoginModal.onClose();
        RegisterModal.onOpen();

    },[LoginModal, RegisterModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title='Welcome back' subtitle='Login to your account!' />
             <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' label='Password' type='password' disabled={isLoading} register={register} errors={errors} required />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline label='Continue with Google' Icon={FcGoogle} onClick={()=>signIn('google')} />
            <Button outline label='Continue with Github' Icon={AiFillGithub} onClick={()=>signIn('github')} />
                <div className="text-neutral-500 mt-4 text-center font-light">
                    <div className="flex flex-row items-center justify-center gap-2">
                        <div className="">
                            First time using Airbnb?
                        </div>
                        <div onClick={toggle} className="hover:underline cursor-pointer text-neutral-800">
                            Create an account
                        </div>
                    </div>
                </div>
        </div>
        
    )
    return (
        <Modal
            disabled={isLoading}
            isOpen={LoginModal.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={LoginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal