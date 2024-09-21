"use client";
import React, { useEffect, useState } from 'react'

interface ClientOnlyProps {
    children: React.ReactNode
}
const ClientOnly:React.FC<ClientOnlyProps> = ({children}) => {
    const [hasMoundted, setHasMounted] = useState(false);

    useEffect(()=>{
        setHasMounted(true)
    },[]);

    if(!hasMoundted){
        return null;
    }

     
  return (
    <>
    {children}
    </>
  )
}

export default ClientOnly