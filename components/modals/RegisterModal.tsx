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
import { signIn } from 'next-auth/react';
import useLoginModal from '@/hooks/useLoginModal';

const RegisterModal = () => {
    const RegisterModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);


        axios.post('/api/register', data)
            .then((response) => {
                RegisterModal.onClose()
                toast.success("Registered successfully!");
            })
            .catch((error) => {
                console.log("error in register modal: ", error);
                toast.error("Something went wrong!");
            })
            .finally(() => {
                setIsLoading(false);
            })
    }


    const toggle = useCallback(()=>{
        RegisterModal.onClose();
        loginModal.onOpen();

    },[loginModal, RegisterModal])


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title='Welcome to Airbnb' subtitle='Create an Account!' />
            <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required />
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
                            Already have an account
                        </div>
                        <div onClick={toggle} className="hover:underline cursor-pointer text-neutral-800">
                            Login
                        </div>
                    </div>
                </div>
        </div>
        
    )
    return (
        <Modal
            disabled={isLoading}
            isOpen={RegisterModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={RegisterModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal