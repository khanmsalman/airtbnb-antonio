"use client";
import React, { useCallback, useState } from 'react'
import Avatar from './Avatar'
import MenuItem from './MenuItem';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
 import { signOut } from 'next-auth/react';
import { SafeUser } from '@/types';
import { AiOutlineMenu } from 'react-icons/ai';
import useRentModal from '@/hooks/useRentModal';


interface AirbnbHomeProps {
    currentUser?: SafeUser | null
}
const AirbnbHome: React.FC<AirbnbHomeProps> = ({ currentUser }) => {
    const [open, setOpen] = useState(false);
    const RegisterModal = useRegisterModal();
    const LoginModal = useLoginModal()
    const rentModal = useRentModal()


    const toggleOpen = useCallback(() => {
        setOpen((value) => !value)
    }, []);

    const onRent = useCallback(()=>{
        if(!currentUser){
           return LoginModal.onOpen();
        }

        // Open Rent Modal
        rentModal.onOpen()
    },[currentUser, LoginModal, rentModal])
    return (
        <div className='relative'>
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRent} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Airbnb your home
                </div>
                <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>

            {open && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {
                            currentUser ? (
                                <>
                                    <MenuItem onClick={() =>{}} 
                                    label="My trips"
                                     />
                                    <MenuItem onClick={() =>{}} 
                                    label="My favorites"
                                     />
                                    <MenuItem onClick={() =>{}} 
                                    label="My reservations"
                                     />
                                    <MenuItem onClick={() =>{}} 
                                    label="My properties"
                                     />
                                    <MenuItem onClick={rentModal.onOpen} 
                                    label="Airbnb my home"
                                     />
                                     <hr />
                                    <MenuItem onClick={() =>signOut()} 
                                    label="Logout"
                                     />

                                </>
                            ) : (

                                <>
                                    <MenuItem onClick={() => {
                                        LoginModal.onOpen();
                                        setOpen(false)
                                    }} label="Login" />
                                    <MenuItem onClick={() => {
                                        RegisterModal.onOpen();
                                        setOpen(false)
                                    }} label="Signup" />
                                </>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default AirbnbHome;
